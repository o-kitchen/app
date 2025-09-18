"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Settings, LogOut, Menu, X, Sun, Moon, Monitor, Languages, Wallet, Info, Home, Compass, ScrollText, Plus } from "lucide-react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { usePathname, useRouter } from "next/navigation";
import { useLensAuthStore } from "@/stores/auth-store";
import { ConnectKitButton } from "connectkit";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProfileSelectStore } from "@/stores/profile-select-store";
import { UserAvatar } from "@/components/user-avatar";
import { toast } from "sonner";
import copy from "copy-to-clipboard";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useLocale } from "next-intl";
import { useRouter as useIntlRouter } from "@/i18n/navigation";
import { useReconnectWallet } from "@/hooks/auth/use-reconnect-wallet";
import { UploadDialog } from "./dialogs/upload/upload-dialog";

export default function Header() {
  const t = useTranslations("header");
  const navT = useTranslations("navigation");
  const { disconnect: disconnectWallet } = useDisconnect();
  const { currentProfile, setCurrentProfile, sessionClient, setSessionClient } =
    useLensAuthStore();
  const router = useRouter();
  const { address, isConnected, isConnecting, status } = useAccount();
  const { setProfileSelectModalOpen } = useProfileSelectStore();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [uploadDialogOpened, setUploadDialogOpened] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const locale = useLocale();
  const intlRouter = useIntlRouter();
  const reconnectWallet = useReconnectWallet();

  // TODO: fix this
  const handleLanguageChange = (newLocale: string) => {
    // Remove the current locale prefix from pathname
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";
    // Navigate to the new locale path
    intlRouter.push(pathWithoutLocale, { locale: newLocale });
  };

  useEffect(() => {
    // handle wagmi wallet connect error
    if (address && !isConnected && isConnecting) {
      disconnectWallet();
    }
  }, [address, isConnected, isConnecting]);

  // Auto-open profile select modal when wallet is connected but no profile is selected
  useEffect(() => {
    if (isConnected && address && !currentProfile) {
      setProfileSelectModalOpen(true);
    }
  }, [isConnected, address, currentProfile, setProfileSelectModalOpen]);

  const navItems = [
    { href: "/", label: navT("feed"), icon: Home },
    { href: '/discover', label: navT('discover'), icon: Compass },
    { href: "/what-is-chip", label: navT("onchainProof"), icon: ScrollText },
    { href: "/about", label: navT("home"), icon: Info },
  ];

  const handleDisconnect = async () => {
    disconnectWallet();
    await sessionClient?.logout();
    setCurrentProfile(null);
    setSessionClient(null);
  };

  const handleUploadButtonClick = (action: string) => {
    setSelectedAction(action);
    if (action === "Cook Work") {
      setUploadDialogOpened(false);
      router.push("/create");
    }
  };

  const handleUploadDialogClose = () => {
    setUploadDialogOpened(false);
    setSelectedAction(null);
  };

  return (
    <header className="fixed bottom-0 left-0 right-0 z-10 w-auto border-t border-gray-200 bg-white/80 backdrop-blur-md dark:bg-gray-900 dark:border-gray-800 shadow-sm 
    md:left-0 md:top-0 md:bottom-auto md:w-16 md:h-screen md:border-r md:border-t-0 md:border-b-0 md:right-auto">
      <div className="container mx-auto px-1 sm:px-1 lg:px-1 md:px-1">
        <div className="flex items-center justify-between h-12 md:flex-col md:justify-start md:space-y-6 md:py-8 md:h-full">
          {/* Mobile menu button*/}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-600 hover:text-gray-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
          
          {/* Logo */}
          <Link href="/" className="hidden md:flex items-center space-x-2">
            <img src="/icon0.svg" alt="o-kitchen" className="h-10 w-10" />
          </Link>
          
          {/* Desktop Navigation*/}
          <nav className="hidden md:flex flex-col items-center space-y-4">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center justify-center w-10 h-10 font-medium transition-colors text-gray-600 hover:text-orange-600 cursor-pointer dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    isActive ? "text-orange-600 bg-orange-50 dark:bg-orange-900/20" : ""
                  }`}
                  title={label}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              );
            })}
          </nav>
          
          {/* User Actions */}
          <div className="flex items-center space-x-4 md:flex-col md:space-x-0 md:space-y-2">
            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 md:h-10 md:w-10">
                  {theme === "light" ? (
                    <Sun className="h-4 w-4" />
                  ) : theme === "dark" ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Monitor className="h-4 w-4" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-40">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Monitor className="mr-2 h-4 w-4" />
                  <span>System</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Language Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild disabled={true}>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 md:h-10 md:w-10"
                >
                  <Languages className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-32" >
                <DropdownMenuItem 
                  onClick={() => handleLanguageChange("zh")}
                >
                  <span>中文</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleLanguageChange("en")}
                >
                  <span>English</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Create Button - 只在用户登录时显示 */}
            {/*currentProfile && (
              <Button
                variant="default"
                size="sm"
                className="chip-button text-white md:h-10 md:w-10 md:p-0 rounded-full"
                onClick={() => setUploadDialogOpened(true)}
              >
                <span className="md:hidden">{t("cook")}</span>
                <Plus className="h-5 w-5 md:block hidden font-bold" />
              </Button>
            )*/}

            {currentProfile ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 md:h-9 md:w-9 rounded-full"
                  >
                    <Avatar className="h-8 w-8 md:h-9 md:w-9 border-2 border-gray-200">
                      <AvatarImage
                        src={currentProfile?.metadata?.picture || "/gull.jpg"}
                      />
                      <AvatarFallback className="bg-gray-100 text-gray-700">
                        {currentProfile?.username?.localName
                          ?.charAt(0)
                          ?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 border-gray-200"
                  align="start"
                  forceMount
                >
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium dark:text-neutral-100 text-gray-800">
                        @{currentProfile?.username?.localName || t("anonymous")}
                      </p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground dark:text-neutral-400">
                        {currentProfile?.metadata?.bio || t("fanworkLover")}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem
                    onClick={() => {
                      reconnectWallet();
                    }}
                    className="text-gray-700 hover:text-gray-900"
                  >
                    <Wallet className="mr-2 h-4 w-4" />
                    <span>Address</span>
                  </DropdownMenuItem> 
                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="text-gray-700 hover:text-gray-900"
                    >
                      <User className="mr-2 h-4 w-4" />
                      {navT("profile")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/settings"
                      className="text-gray-700 hover:text-gray-900"
                      style={{
                        cursor: 'not-allowed',
                        opacity: 0.5,
                      }}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      {t("settings")} ({t("developing")})
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem
                    onClick={handleDisconnect}
                    className="text-gray-700 hover:text-gray-900"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    {t("disconnect")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : isConnected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full shrink-0"
                  >
                    <UserAvatar />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48" align="start" forceMount>
                  <DropdownMenuItem
                    onClick={() => {
                      setProfileSelectModalOpen(true);
                    }}
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>{t("selectProfile")}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => disconnectWallet()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t("logOut")}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <ConnectKitButton.Custom>
                {({ show }) => {
                  return (
                    <Button
                      onClick={show}
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 md:h-10 md:w-10"
                    >
                    <Wallet/>
                    </Button>
                  );
                }}
              </ConnectKitButton.Custom>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed bottom-12 left-0 right-0 border-t border-gray-200 bg-white/95 backdrop-blur-sm z-40 max-h-80 overflow-y-auto">
            <nav className="flex flex-col space-y-2 p-4">
              {navItems.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center space-x-3 text-gray-600 hover:text-gray-800 transition-colors py-2 font-medium ${
                      isActive ? "text-orange-600" : ""
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{label}</span>
                  </Link>
                );
              })}

              {/* Mobile Theme and Language Switches */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                {/* Theme Toggle */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">主题:</span>
                  <div className="flex space-x-1">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme("light")}
                      className="h-8 px-2"
                    >
                      <Sun className="h-3 w-3" />
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme("dark")}
                      className="h-8 px-2"
                    >
                      <Moon className="h-3 w-3" />
                    </Button>
                    <Button
                      variant={theme === "system" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme("system")}
                      className="h-8 px-2"
                    >
                      <Monitor className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Language Toggle */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">语言:</span>
                  <div className="flex space-x-1">
                    <Button
                      variant={locale === "zh" ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        handleLanguageChange("zh");
                        setIsMobileMenuOpen(false);
                      }}
                      className="h-8 px-2"
                    >
                      中
                    </Button>
                    <Button
                      variant={locale === "en" ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        handleLanguageChange("en");
                        setIsMobileMenuOpen(false);
                      }}
                      className="h-8 px-2"
                    >
                      EN
                    </Button>
                  </div>
                </div>
              </div>

              {/* {!currentProfile && (
                <ConnectKitButton.Custom>
                  {({ show }) => (
                    <Button
                      onClick={() => {
                        if (show) show()
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      Connect Wallet
                    </Button>
                  )}
                </ConnectKitButton.Custom>
              )} */}
            </nav>
          </div>
        )}
      </div>
      
      <UploadDialog
        opened={uploadDialogOpened}
        onClose={handleUploadDialogClose}
        onButtonClick={handleUploadButtonClick}
        selectedAction={selectedAction}
      />
    </header>
  );
}
