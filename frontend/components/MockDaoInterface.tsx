import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePrivy } from "@privy-io/react-auth";
import Popup from "./Popup";

interface MockDaoInterfaceProps {
  onTaskProgress: (taskType: string) => void;
  tutorial: any;
  level: number;
}

export default function MockDaoInterface({
  onTaskProgress,
  tutorial,
  level,
}: MockDaoInterfaceProps) {
  const { login, authenticated } = usePrivy();
  const [hasJoinedDAO, setHasJoinedDAO] = useState(false);
  const [proposalsReviewed, setProposalsReviewed] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [hasDiscussed, setHasDiscussed] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  // Join DAO Community
  const handleJoinDAO = () => {
    setHasJoinedDAO(true);
    onTaskProgress("JOIN_DAO");
  };

  const handlePopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Review DAO Proposals
  const handleReviewProposals = () => {
    setProposalsReviewed(true);
    onTaskProgress("REVIEW_PROPOSALS");
  };

  // Vote on a Proposal
  const handleVote = () => {
    setHasVoted(true);
    onTaskProgress("VOTE_ON_PROPOSAL");
  };

  // Discuss Governance
  const handleDiscussGovernance = () => {
    setHasDiscussed(true);
    onTaskProgress("DISCUSS_GOVERNANCE");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">
        Participate in DAO Governance
      </h2>

      {/* Join DAO Community */}
      <Button
        onClick={() => {
          handlePopup();
        }}
        className="w-full"
        
      >
        {showPopup && <Popup onClose={handleClosePopup} />}
        Join DAO Community ✅
      </Button>
    </div>
  );
}
