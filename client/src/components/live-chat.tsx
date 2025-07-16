import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, X, User, Bot, Phone, Mail, Clock, Minimize2, Maximize2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/language-context";

interface ChatMessage {
  id: number;
  sender: "user" | "agent";
  message: string;
  timestamp: Date;
  isRead: boolean;
}

export default function LiveChat() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-responses for demo
  const autoResponses = [
    "Hello! Welcome to Elegance Stone. How can I help you with your stone project today?",
    "Thank you for your interest! I'd be happy to assist you with product information and pricing.",
    "That's a great question! Let me help you find the perfect stone solution for your needs.",
    "I can help you with material selection, pricing, installation, and technical specifications.",
    "Would you like me to connect you with one of our stone specialists for a detailed consultation?",
    "We have a wide range of natural stones available. What type of project are you working on?",
    "I can provide you with instant quotes and AR previews of our stones. What would be most helpful?",
    "Our team is here to support you throughout your stone selection and installation process."
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 1,
        sender: "agent",
        message: "Hello! Welcome to Elegance Stone. I'm Sarah, your virtual assistant. How can I help you with your natural stone project today?",
        timestamp: new Date(),
        isRead: true
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: "user",
      message: message.trim(),
      timestamp: new Date(),
      isRead: true
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      setIsTyping(false);
      const responseMessage: ChatMessage = {
        id: Date.now() + 1,
        sender: "agent",
        message: autoResponses[Math.floor(Math.random() * autoResponses.length)],
        timestamp: new Date(),
        isRead: true
      };
      setMessages(prev => [...prev, responseMessage]);
      
      if (isMinimized) {
        setUnreadCount(prev => prev + 1);
      }
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (!isMinimized) {
      setUnreadCount(0);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleChat}
          className="relative bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-2xl hover:shadow-purple-500/25 rounded-full w-16 h-16 p-0 animate-pulse hover:animate-none transition-all duration-300 transform hover:scale-110"
        >
          <MessageCircle className="h-6 w-6" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-96 bg-white border border-gray-200 shadow-2xl transition-all duration-300 ${
        isMinimized ? 'h-16' : 'h-[500px]'
      }`}>
        {/* Header */}
        <CardHeader className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-purple-700 text-white text-sm">SA</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg font-semibold">Live Support</CardTitle>
                <div className="flex items-center space-x-2 text-sm text-purple-100">
                  <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-gray-400'}`} />
                  <span>{isOnline ? 'Sarah is online' : 'Offline'}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMinimize}
                className="text-white hover:bg-white/20 w-8 h-8"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleChat}
                className="text-white hover:bg-white/20 w-8 h-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Content */}
        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[436px]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${
                    msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <Avatar className="w-6 h-6 flex-shrink-0">
                      <AvatarFallback className={`text-xs ${
                        msg.sender === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-purple-500 text-white'
                      }`}>
                        {msg.sender === 'user' ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`rounded-lg px-3 py-2 ${
                      msg.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white border border-gray-200 text-gray-800'
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.message}</p>
                      <div className={`text-xs mt-1 ${
                        msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(msg.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="bg-purple-500 text-white text-xs">
                        <Bot className="h-3 w-3" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-white border border-gray-200 rounded-lg px-3 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 bg-white border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs h-7 border-purple-200 text-purple-600 hover:bg-purple-50"
                  onClick={() => {
                    setMessage("I need help with product pricing");
                    handleSendMessage();
                  }}
                >
                  Pricing Info
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs h-7 border-purple-200 text-purple-600 hover:bg-purple-50"
                  onClick={() => {
                    setMessage("Can I schedule a consultation?");
                    handleSendMessage();
                  }}
                >
                  Book Consultation
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs h-7 border-purple-200 text-purple-600 hover:bg-purple-50"
                  onClick={() => {
                    setMessage("What installation services do you offer?");
                    handleSendMessage();
                  }}
                >
                  Installation
                </Button>
              </div>
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isTyping}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-4"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Contact options */}
              <div className="flex items-center justify-center space-x-4 mt-3 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Phone className="h-3 w-3" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Mail className="h-3 w-3" />
                  <span>support@elegancestone.com</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}