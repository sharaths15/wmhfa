import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

import {
  Sprout,
  MessageCircleHeart,
  Users,
  Award,
  BookOpen,
  Star,
  Feather,
  Milestone,
} from "lucide-react";
import { type Achievement } from "@/app/types";

const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    id: "a1",
    title: "First Steps",
    description: "Joined the MHFAider community.",
    category: "Milestones",
    icon: Milestone,
    earnedDate: new Date("2023-08-15").toISOString(),
    earned: true,
  },
  {
    id: "a2",
    title: "Community Seedling",
    description: "Made your first post.",
    category: "Community",
    icon: Sprout,
    earnedDate: new Date("2023-08-20").toISOString(),
    earned: true,
  },
  {
    id: "a3",
    title: "Supportive Voice",
    description: "Posted 10 supportive comments.",
    category: "Community",
    icon: MessageCircleHeart,
    earnedDate: new Date("2023-09-05").toISOString(),
    earned: true,
  },
  {
    id: "a4",
    title: "Knowledge Seeker",
    description: "Completed your first training module.",
    category: "Learning",
    icon: BookOpen,
    earnedDate: new Date("2023-09-12").toISOString(),
    earned: true,
  },
  {
    id: "a5",
    title: "Community Pillar",
    description: "Posted 50 supportive comments.",
    category: "Community",
    icon: Users,
    earnedDate: null,
    earned: false,
  },
  {
    id: "a6",
    title: "Helping Hand",
    description: "Your post was shared 5 times.",
    category: "Community",
    icon: Feather,
    earnedDate: null,
    earned: false,
  },
  {
    id: "a7",
    title: "Certified MHFAider",
    description: "Completed the full MHFA training course.",
    category: "Learning",
    icon: Award,
    earnedDate: new Date("2023-10-01").toISOString(),
    earned: true,
  },
  {
    id: "a8",
    title: "Guiding Light",
    description: "Reached 100 likes on your posts and comments.",
    category: "Community",
    icon: Star,
    earnedDate: null,
    earned: false,
  },
  {
    id: "a9",
    title: "Anniversary",
    description: "Celebrated 1 year with the community.",
    category: "Milestones",
    icon: Milestone,
    earnedDate: null,
    earned: false,
  },
];

const AchievementCard = ({ achievement }: { achievement: Achievement }) => (
  <TooltipProvider delayDuration={100}>
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={`border rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-2 transition-all duration-300 ${
            achievement.earned
              ? "bg-surface shadow-soft"
              : "bg-subtle/50 opacity-60"
          }`}
        >
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center ${
              achievement.earned
                ? "bg-secondary/10 text-secondary"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            <achievement.icon size={32} />
          </div>
          <h4
            className={`font-bold text-base ${
              achievement.earned ? "text-text" : "text-text-light"
            }`}
          >
            {achievement.title}
          </h4>
          {achievement.earned && achievement.earnedDate && (
            <p className="text-xs text-text-light">
              Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
            </p>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs text-center">
        <p>{achievement.description}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export const MyAchievementsPage = () => {
  const earnedAchievements = MOCK_ACHIEVEMENTS.filter((a) => a.earned);
  const nextCommunityAchievement = MOCK_ACHIEVEMENTS.find(
    (a) => !a.earned && a.category === "Community"
  );
  const nextLearningAchievement = MOCK_ACHIEVEMENTS.find(
    (a) => !a.earned && a.category === "Learning"
  );

  return (
    <div className="space-y-10">
      <header className="text-center">
        <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
          <Sprout className="text-primary" size={48} />
        </div>
        <h2 className="text-4xl font-extrabold text-text">
          Your Growth Journey
        </h2>
        <p className="text-lg text-text-light mt-2 max-w-2xl mx-auto">
          Acknowledge your progress and see the positive impact you're making in
          the community.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="bg-surface shadow-soft lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Growth Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-base">
              <span className="text-text-light">Achievements Unlocked</span>
              <span className="font-bold text-primary">
                {earnedAchievements.length} / {MOCK_ACHIEVEMENTS.length}
              </span>
            </div>
            <Progress
              value={
                (earnedAchievements.length / MOCK_ACHIEVEMENTS.length) * 100
              }
              className="h-2"
            />

            <div className="flex items-center justify-between text-base pt-4">
              <span className="text-text-light">Supportive Comments</span>
              <span className="font-bold text-primary">32</span>
            </div>
            <div className="flex items-center justify-between text-base">
              <span className="text-text-light">Resources Shared</span>
              <span className="font-bold text-primary">5</span>
            </div>
          </CardContent>
        </Card>

        {nextCommunityAchievement && (
          <Card className="bg-surface shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Next Community Step</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center space-x-4">
              <div className="w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center bg-gray-200 text-gray-400">
                <nextCommunityAchievement.icon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-text">
                  {nextCommunityAchievement.title}
                </h4>
                <p className="text-sm text-text-light">
                  {nextCommunityAchievement.description}
                </p>
                {nextCommunityAchievement.id === "a5" && (
                  <Progress value={(32 / 50) * 100} className="h-1.5 mt-2" />
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {nextLearningAchievement && (
          <Card className="bg-surface shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Next Learning Goal</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center space-x-4">
              <div className="w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center bg-gray-200 text-gray-400">
                <nextLearningAchievement.icon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-text">
                  {nextLearningAchievement.title}
                </h4>
                <p className="text-sm text-text-light">
                  {nextLearningAchievement.description}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">
              All ({MOCK_ACHIEVEMENTS.length})
            </TabsTrigger>
            <TabsTrigger value="community">
              Community (
              {
                MOCK_ACHIEVEMENTS.filter((a) => a.category === "Community")
                  .length
              }
              )
            </TabsTrigger>
            <TabsTrigger value="learning">
              Learning (
              {
                MOCK_ACHIEVEMENTS.filter((a) => a.category === "Learning")
                  .length
              }
              )
            </TabsTrigger>
            <TabsTrigger value="milestones">
              Milestones (
              {
                MOCK_ACHIEVEMENTS.filter((a) => a.category === "Milestones")
                  .length
              }
              )
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="all"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            {MOCK_ACHIEVEMENTS.map((ach) => (
              <AchievementCard key={ach.id} achievement={ach} />
            ))}
          </TabsContent>
          <TabsContent
            value="community"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            {MOCK_ACHIEVEMENTS.filter((a) => a.category === "Community").map(
              (ach) => (
                <AchievementCard key={ach.id} achievement={ach} />
              )
            )}
          </TabsContent>
          <TabsContent
            value="learning"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            {MOCK_ACHIEVEMENTS.filter((a) => a.category === "Learning").map(
              (ach) => (
                <AchievementCard key={ach.id} achievement={ach} />
              )
            )}
          </TabsContent>
          <TabsContent
            value="milestones"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            {MOCK_ACHIEVEMENTS.filter((a) => a.category === "Milestones").map(
              (ach) => (
                <AchievementCard key={ach.id} achievement={ach} />
              )
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
