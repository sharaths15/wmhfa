import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/app/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Award, Mail, Bell, MessageSquare } from "lucide-react";

const ProfileDetails = ({ user }: any) => (
  <div className="space-y-6">
    <div>
      <Label htmlFor="fullname">Full Name</Label>
      <Input id="fullname" defaultValue={user.fullName} />
    </div>
    <div>
      <Label htmlFor="bio">Your Bio</Label>
      <Textarea
        id="bio"
        placeholder="Tell the community a bit about yourself..."
        defaultValue="Certified MHFAider passionate about creating supportive workplaces."
      />
    </div>
    <Button>Save Changes</Button>
  </div>
);

const AccountSettings = () => (
  <div className="space-y-6">
    <div>
      <Label htmlFor="email">Email Address</Label>
      <Input
        id="email"
        type="email"
        defaultValue="john.doe@example.com"
        disabled
      />
    </div>
    <div>
      <h4 className="font-semibold mb-2">Change Password</h4>
      <div className="space-y-2">
        <Input type="password" placeholder="Current Password" />
        <Input type="password" placeholder="New Password" />
        <Input type="password" placeholder="Confirm New Password" />
      </div>
    </div>
    <Button>Update Password</Button>
  </div>
);

const NotificationsSettings = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between p-4 rounded-lg bg-subtle">
      <div>
        <h4 className="font-semibold flex items-center">
          <Mail className="mr-2 h-4 w-4" />
          Email Notifications
        </h4>
        <p className="text-sm text-text-light">
          Receive weekly digests and important updates.
        </p>
      </div>
      <Switch defaultChecked />
    </div>
    <div className="flex items-center justify-between p-4 rounded-lg bg-subtle">
      <div>
        <h4 className="font-semibold flex items-center">
          <Bell className="mr-2 h-4 w-4" />
          Push Notifications
        </h4>
        <p className="text-sm text-text-light">
          Get instant alerts on your devices.
        </p>
      </div>
      <Switch />
    </div>
    <div className="flex items-center justify-between p-4 rounded-lg bg-subtle">
      <div>
        <h4 className="font-semibold flex items-center">
          <MessageSquare className="mr-2 h-4 w-4" />
          Post Activity
        </h4>
        <p className="text-sm text-text-light">
          Notify me about comments and likes on my posts.
        </p>
      </div>
      <Switch defaultChecked />
    </div>
  </div>
);

export const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto">
      <header className="flex items-center space-x-6 mb-10">
        <Avatar className="h-24 w-24">
          <AvatarImage src="https://api.dicebear.com/7.x/thumbs/svg?seed=alex" />
          <AvatarFallback className="text-3xl">
            {user?.fullName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-4xl font-extrabold text-text">
            {user?.fullName}
          </h2>
          <p className="text-text-light text-lg">MHFAider since 2023</p>
          <div className="flex items-center space-x-2 mt-2 text-secondary font-bold">
            <Award size={18} />
            <span>MHFAider Pro Member</span>
          </div>
        </div>
      </header>

      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">My Profile</TabsTrigger>
          <TabsTrigger value="account">Account & Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-6">
          <ProfileDetails user={user} />
        </TabsContent>
        <TabsContent value="account" className="mt-6">
          <AccountSettings />
        </TabsContent>
        <TabsContent value="notifications" className="mt-6">
          <NotificationsSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};
