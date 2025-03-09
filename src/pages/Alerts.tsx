
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Search, Bell, ShieldAlert, Info, Clock, Filter, Check, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

type NotificationType = "alert" | "info" | "warning";

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string; // ISO string
  read: boolean;
  type: NotificationType;
}

// Sample notification data
const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "Security Alert",
    description: "Unusual login attempt detected from IP 192.168.1.5",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
    read: false,
    type: "alert",
  },
  {
    id: "2",
    title: "System Update",
    description: "New security patches available for installation",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    read: false,
    type: "info",
  },
  {
    id: "3",
    title: "Network Warning",
    description: "High bandwidth usage detected on port 8080",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    read: true,
    type: "warning",
  },
  {
    id: "4",
    title: "Security Alert",
    description: "Multiple failed login attempts for user 'admin'",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    read: true,
    type: "alert",
  },
  {
    id: "5",
    title: "System Info",
    description: "Daily backup completed successfully",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    read: true,
    type: "info",
  },
  {
    id: "6",
    title: "Network Warning",
    description: "Intermittent connectivity detected on interface eth0",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 24 hours ago
    read: true,
    type: "warning",
  }
];

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "alert":
      return <ShieldAlert className="h-4 w-4 text-destructive" />;
    case "warning":
      return <Clock className="h-4 w-4 text-amber-500" />;
    case "info":
    default:
      return <Info className="h-4 w-4 text-blue-500" />;
  }
};

const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const Alerts = () => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          notification.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || (activeTab === "unread" && !notification.read);
    return matchesSearch && matchesTab;
  });
  
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    toast({
      description: "Notification marked as read",
    });
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    toast({
      description: "All notifications marked as read",
    });
  };
  
  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    toast({
      description: "Notification deleted",
      variant: "destructive"
    });
  };
  
  const clearAllNotifications = () => {
    setNotifications([]);
    toast({
      description: "All notifications cleared",
      variant: "destructive"
    });
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Notifications & Alerts</h1>
          
          <div className="flex items-center gap-2">
            {notifications.some(n => !n.read) && (
              <Button
                variant="outline"
                size="sm"
                onClick={markAllAsRead}
                className="h-9"
              >
                <Check className="h-4 w-4 mr-2" />
                Mark all as read
              </Button>
            )}
            {notifications.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllNotifications}
                className="h-9"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear all
              </Button>
            )}
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Alert History</CardTitle>
            <CardDescription>
              View and manage your notification history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search notifications..."
                    className="pl-8 bg-background"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as "all" | "unread")} className="w-full sm:w-auto">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="unread">
                      Unread
                      {notifications.some(n => !n.read) && (
                        <Badge variant="secondary" className="ml-2">
                          {notifications.filter(n => !n.read).length}
                        </Badge>
                      )}
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              {filteredNotifications.length === 0 ? (
                <div className="h-60 flex flex-col items-center justify-center text-center p-4">
                  <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No notifications</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {searchQuery 
                      ? "No notifications match your search criteria." 
                      : activeTab === "unread" 
                        ? "You have no unread notifications."
                        : "You don't have any notifications yet."}
                  </p>
                </div>
              ) : (
                <div className="border rounded-md">
                  {filteredNotifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={cn(
                        "p-4 flex border-b last:border-b-0 transition-colors",
                        !notification.read && "bg-accent/20"
                      )}
                    >
                      <div className="mr-3 mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between">
                          <h4 className={cn(
                            "text-sm",
                            !notification.read ? "font-medium" : ""
                          )}>
                            {notification.title}
                          </h4>
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {notification.description}
                        </p>
                      </div>
                      <div className="flex items-center ml-4 gap-2">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => markAsRead(notification.id)}
                            title="Mark as read"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => deleteNotification(notification.id)}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Alerts;
