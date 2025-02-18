/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { ArrowRightCircle, User, Star, Trophy } from 'lucide-react';

const GamifiedReferral = () => {
  const [userPoints, setUserPoints] = useState(120); 
  const [userRank, setUserRank] = useState(5); 
  const [leaderboard, setLeaderboard] = useState([
    { name: 'John Doe', points: 300, rank: 1 },
    { name: 'Jane Smith', points: 250, rank: 2 },
    { name: 'Emily Johnson', points: 200, rank: 3 },
    { name: 'Chris Lee', points: 180, rank: 4 },
    { name: 'You', points: userPoints, rank: userRank },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const handleReferralClick = () => {
    setIsLoading(true);
    // Simulate generating referral link
    setTimeout(() => {
      console.log('Referral link clicked');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="w-11/12 md:w-9/12 mx-auto py-10 exo2 bg-gray-50 dark:bg-[#0B0716]">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800  dark:bg-[#0D0A1F]">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500/10 p-2 rounded-lg">
            <Trophy className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Gamified Referral & Rewards</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Earn points, discounts, and rewards for referring friends!</p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Referral Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white">Referral Program</h3>
          <p className="text-gray-500 dark:text-gray-400">Invite your friends to DreamKey and earn rewards!</p>
          <button
            onClick={handleReferralClick}
            className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="spinner-border animate-spin h-5 w-5 border-4 border-t-transparent rounded-full"></div>
            ) : (
              <>
                Get Referral Link
                <ArrowRightCircle className="h-4 w-4" />
              </>
            )}
          </button>
        </div>

        {/* Rewards Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white">Your Rewards</h3>
          <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{userPoints} Points</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Rank: #{userRank}</div>
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Earn points for referring friends and engaging with DreamKey!
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white">Leaderboard</h3>
        <div className="space-y-4 mt-4">
          {leaderboard.map((user, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ${
                index === 0 ? ' ' : ''
              } transition-transform hover:scale-105 duration-300 ease-in-out`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                  <span className="text-sm font-medium text-gray-800 dark:text-white">{user.name}</span>
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {user.points} Points
                </div>
              </div>
              {index === 0 && (
                <div className="flex items-center justify-start mt-2 text-sm text-gray-500 dark:text-gray-300">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="ml-2">Top Leader!</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamifiedReferral;
