import { useTranslation } from "react-i18next";
import SideDrawer from "../shared/SideDrawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, MapPin } from "lucide-react";

interface AccountDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AccountDrawer({ isOpen, onClose }: AccountDrawerProps) {
    const { t } = useTranslation();

    return (
        <SideDrawer isOpen={isOpen} onClose={onClose} title={t("general.account.title")}>
            <div className="space-y-10">
                <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8 h-12 rounded-none bg-muted p-1">
                        <TabsTrigger value="login" className="rounded-none data-[state=active]:bg-background data-[state=active]:shadow-none uppercase font-bold tracking-widest text-xs">
                            {t("general.account.login")}
                        </TabsTrigger>
                        <TabsTrigger value="register" className="rounded-none data-[state=active]:bg-background data-[state=active]:shadow-none uppercase font-bold tracking-widest text-xs">
                            {t("general.account.register")}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="login" className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">{t("general.account.email")}</Label>
                                <div className="relative">
                                    <Input id="email" type="email" placeholder="email@example.com" className="ps-10 h-12 rounded-none" />
                                    <Mail className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">{t("general.account.password")}</Label>
                                    <a href="#" className="text-xs text-primary hover:underline">{t("general.account.forgot_password")}</a>
                                </div>
                                <div className="relative">
                                    <Input id="password" type="password" className="ps-10 h-12 rounded-none" />
                                    <Lock className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                </div>
                            </div>
                        </div>
                        <Button className="w-full h-12 uppercase font-bold tracking-widest">{t("general.account.sign_in")}</Button>
                    </TabsContent>

                    <TabsContent value="register" className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="first-name">{t("general.account.first_name")}</Label>
                                    <Input id="first-name" className="h-12 rounded-none" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last-name">{t("general.account.last_name")}</Label>
                                    <Input id="last-name" className="h-12 rounded-none" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="reg-email">{t("general.account.email")}</Label>
                                <Input id="reg-email" type="email" className="h-12 rounded-none" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="reg-password">{t("general.account.password")}</Label>
                                <Input id="reg-password" type="password" className="h-12 rounded-none" />
                            </div>
                        </div>
                        <Button className="w-full h-12 uppercase font-bold tracking-widest">{t("general.account.submit")}</Button>
                    </TabsContent>
                </Tabs>

                {/* Store Info Section */}
                <div className="pt-10 border-t border-border space-y-6">
                    <h4 className="font-bold uppercase tracking-widest text-sm">{t("header.welcome")}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {t("header.welcome_text")}
                    </p>

                    <ul className="space-y-4 text-sm font-medium">
                        <li className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>{t("header.location")}</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-primary" />
                            <span>{t("header.email")}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </SideDrawer>
    );
}
