"use client";

import FullScreenLoader from "@/components/common/loader";
import { getQuestionsByPattern } from "@/constants/questions";
import { Routes } from "@/constants/routes";
import { useLoggedPersonId } from "@/hooks/useLoggedPersonId";
import { useParticipantCreditId } from "@/hooks/useParticipantCreditId";
import ExitDiscoveryModal from "@/modals/exitDiscoveryModal";
import {
  getQuestionAnswerStatusApi,
  insert11Q17QAnswersApi,
} from "@/network/apis/discovery";
import { AppDispatch } from "@/store";
import { setDiscoveryStatus } from "@/store/slices/discoverySlice";
import { Button, Progress, Typography } from "antd";
import { ChevronLeft, ChevronRight, Meh, Smile } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const { Title } = Typography;

type Selection = "most" | "least" | null;

type SavedAnswer = {
  mostKey: string;
  leastKey: string;
};

const Discovery = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const questions = useMemo(() => getQuestionsByPattern("17"), []);
  const totalGroups = questions.length;

  const personId = useLoggedPersonId();
  const { participantCreditId } = useParticipantCreditId();

  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [maxReachedGroupIndex, setMaxReachedGroupIndex] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

  const [selections, setSelections] = useState<Record<string, Selection>>({});
  const [savedAnswers, setSavedAnswers] = useState<Record<number, SavedAnswer>>(
    {},
  );

  const [parentQuestionId, setParentQuestionId] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingProgress, setIsLoadingProgress] = useState(false);
  const isNavigatingRef = useRef(false); // prevents loader flicker on final submit
  const currentGroup = questions[currentGroupIndex] ?? [];

  const isGoingBack = currentGroupIndex < maxReachedGroupIndex;

  const canGoBack = currentGroupIndex > 0 && !isGoingBack;
  const canGoForward =
    isGoingBack && currentGroupIndex === maxReachedGroupIndex - 1;

  const progressPercent = totalGroups
    ? Math.round((answeredCount / totalGroups) * 100)
    : 0;

  const hasMost = currentGroup.some((q) => selections[q.key] === "most");
  const hasLeast = currentGroup.some((q) => selections[q.key] === "least");
  const isGroupComplete = hasMost && hasLeast;

  const getQuestionIdFromKey = (key: string) =>
    Number.parseInt(key.split("-").at(-1) || "0", 10);

  const submitAnswer = async (
    mostQuestion: any,
    leastQuestion: any,
    groupIndex: number,
  ) => {
    setIsSubmitting(true);

    try {
      const response: any = await insert11Q17QAnswersApi({
        creditID: participantCreditId,
        parentID: mostQuestion.parentId,
        questionPattern: 17,
        question: {
          most: getQuestionIdFromKey(mostQuestion.key),
          least: getQuestionIdFromKey(leastQuestion.key),
        },
      });

      if (!response?.data) return;

      // Save submitted answers locally
      setSavedAnswers((prev) => ({
        ...prev,
        [groupIndex]: {
          mostKey: mostQuestion.key,
          leastKey: leastQuestion.key,
        },
      }));

      setSelections({});

      const isLastGroup = groupIndex === totalGroups - 1;

      if (isLastGroup) {
        isNavigatingRef.current = true;
        router.replace(Routes.DISCOVERY_COMPLETED);

        dispatch(
          setDiscoveryStatus({
            completed: true,
            inProgress: false,
            scheduled: false,
          }),
        );
        setAnsweredCount(totalGroups);

        return;
      }

      const nextIndex = groupIndex + 1;
      setCurrentGroupIndex(nextIndex);
      setMaxReachedGroupIndex(nextIndex);
      setAnsweredCount((prev) => Math.min(prev + 1, totalGroups));
    } catch (error) {
      console.error("Failed to submit 17Q answer:", error);
    } finally {
      if (!isNavigatingRef.current) {
        setIsSubmitting(false);
      }
    }
  };

  const fetchProgress = async (personId: string) => {
    try {
      setIsLoadingProgress(true);
      const response: any = await getQuestionAnswerStatusApi(personId);
      setParentQuestionId(
        response?.data?.discoveryQuestionAnswerDto?.parentId ?? 0,
      );
    } catch (error) {
      console.error("Failed to fetch progress:", error);
    } finally {
      setIsLoadingProgress(false);
    }
  };

  // Fetch last answered question from backend
  useEffect(() => {
    if (personId) fetchProgress(personId);
  }, [personId]);

  // Resume assessment from backend progress
  useEffect(() => {
    if (!parentQuestionId || !questions.length) return;

    const completedIndex = questions.findIndex(
      (group) => group[0]?.parentId === parentQuestionId,
    );

    if (completedIndex < 0) return;

    const nextIndex = Math.min(completedIndex + 1, totalGroups - 1);

    setCurrentGroupIndex(nextIndex);
    setMaxReachedGroupIndex(nextIndex);
    setAnsweredCount(nextIndex);
  }, [parentQuestionId, questions, totalGroups]);

  // Restore saved answers when navigating
  useEffect(() => {
    const saved = savedAnswers[currentGroupIndex];
    if (!saved) {
      setSelections({});
      return;
    }

    setSelections({
      [saved.mostKey]: "most",
      [saved.leastKey]: "least",
    });
  }, [currentGroupIndex, savedAnswers]);

  // Auto-submit once both Most & Least are selected
  useEffect(() => {
    if (!isGroupComplete || !currentGroup.length) return;

    const most = currentGroup.find((q) => selections[q.key] === "most");
    const least = currentGroup.find((q) => selections[q.key] === "least");

    if (!most || !least) return;

    const alreadySaved = savedAnswers[currentGroupIndex];
    if (
      alreadySaved &&
      alreadySaved.mostKey === most.key &&
      alreadySaved.leastKey === least.key
    ) {
      return;
    }

    submitAnswer(most, least, currentGroupIndex);
  }, [
    isGroupComplete,
    currentGroup,
    selections,
    currentGroupIndex,
    savedAnswers,
  ]);

  const handleOptionClick = (
    questionKey: string,
    value: Exclude<Selection, null>,
  ) => {
    setSelections((prev) => {
      const next = Object.fromEntries(
        currentGroup.map((q) => [q.key, prev[q.key] || null]),
      );

      // Toggle off if clicking same option again
      if (next[questionKey] === value) {
        next[questionKey] = null;
        return next;
      }

      // Ensure only one Most / Least per group
      const existingKey = currentGroup.find((q) => next[q.key] === value)?.key;

      if (existingKey) next[existingKey] = null;

      next[questionKey] = value;
      return next;
    });
  };

  return (
    <>
      {(isSubmitting || isLoadingProgress) && <FullScreenLoader />}

      <div className="assessment-wrapper">
        {/* Header */}
        <div className="assessment-header glass-card">
          <div className="ah-content-container">
            <div className="ah-content">
              <div className="ah-content-left">
                <p>
                  Question {currentGroupIndex + 1} of {totalGroups}
                </p>
                <span>17Q Discovery</span>
              </div>
              <ExitDiscoveryModal />
            </div>

            <Progress
              percent={progressPercent}
              showInfo={false}
              className="assessment-progress-bar"
            />
          </div>
        </div>

        {/* Body */}
        <div className="assessment-body-wrapper">
          <div className="ab-content-container">
            <ul className="ab-list">
              {currentGroup.map((question) => (
                <li key={question.key}>
                  <div className="ab-list-content">
                    <Title level={4}>{question.title}</Title>
                    <p>{question.description}</p>
                  </div>

                  <div className="ab-btn-wrap">
                    <Button
                      icon={<Smile />}
                      className={`ab-most-btn ${
                        selections[question.key] === "most" ? "selected" : ""
                      }`}
                      onClick={() => handleOptionClick(question.key, "most")}
                    >
                      Most
                    </Button>

                    <Button
                      icon={<Meh />}
                      className={`ab-least-btn ${
                        selections[question.key] === "least" ? "selected" : ""
                      }`}
                      onClick={() => handleOptionClick(question.key, "least")}
                    >
                      Least
                    </Button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Navigation */}

            <div className="assessment-nav-arrows text-end mt-8!">
              {currentGroupIndex > 0 && (
                <Button
                  type="text"
                  size="large"
                  icon={<ChevronLeft className="h-8 w-8" />}
                  disabled={!canGoBack}
                  onClick={() =>
                    setCurrentGroupIndex((i) => Math.max(0, i - 1))
                  }
                />
              )}
              <Button
                type="text"
                size="large"
                icon={<ChevronRight className="h-8 w-8" />}
                disabled={!canGoForward}
                onClick={() =>
                  setCurrentGroupIndex((i) => Math.min(totalGroups - 1, i + 1))
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Discovery;
