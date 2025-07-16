import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, X, User, Bot } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ChatMessage {
  id: number;
  sessionId: string;
  senderType: "customer" | "agent";
  message: string;
  timestamp: string;
  isRead: boolean;
}

export default function LiveChat() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const { data: messages = [] } = useQuery({
    queryKey: ["/api/chat", sessionId],
    queryFn: () => apiRequest(`/api/chat/${sessionId}`),
    enabled: isOpen,
    refetchInterval: 2000, // Poll for new messages every 2 seconds
  });

  const sendMessage = useMutation({
    mutationFn: async (messageData: { sessionId: string; senderType: string; message: string }) => {
      return await apiRequest("/api/chat", {
        method: "POST",
        body: JSON.stringify(messageData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/chat", sessionId] });
      setMessage("");
    },
  });

  const handleSendMessage = () => {
    if (!message.trim()) return;

    sendMessage.mutate({
      sessionId,
      senderType: "customer",
      message: message.trim(),
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-response simulation for demo
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].senderType === "customer") {
      const timer = setTimeout(() => {
        const responses = [
          "Thank you for your message! How can I help you with your stone project today?",
          "I'd be happy to assist you. What specific information are you looking for?",
          "Great question! Let me help you find the perfect stone solution.",
          "Thanks for reaching out! What type of stone project are you planning?",
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        sendMessage.mutate({
          sessionId,
          senderType: "agent",
          message: randomResponse,
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [messages]);

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-stone hover:opacity-90 shadow-lg magnetic animate-smooth-bounce z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 h-96 z-50 glass-morph shadow-2xl animate-fade-in-up">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <CardTitle className="text-lg">Live Support</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col h-full pb-4">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 text-sm mt-8">
              Welcome! How can we help you today?
            </div>
          )}
          
          {messages.map((msg: ChatMessage) => (
            <div
              key={msg.id}
              className={`flex ${msg.senderType === "customer" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex max-w-[80%] space-x-2 ${
                  msg.senderType === "customer" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  msg.senderType === "customer" 
                    ? "bg-stone-bronze text-white" 
                    : "bg-gray-200 text-gray-600"
                }`}>
                  {msg.senderType === "customer" ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                </div>
                <div
                  className={`px-3 py-2 rounded-lg text-sm ${
                    msg.senderType === "customer"
                      ? "bg-stone-bronze text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
            disabled={sendMessage.isPending}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim() || sendMessage.isPending}
            size="icon"
            className="bg-stone-bronze hover:bg-stone-bronze/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-xs text-gray-500 text-center mt-2">
          Typically replies in a few minutes
        </div>
      </CardContent>
    </Card>
  );
}