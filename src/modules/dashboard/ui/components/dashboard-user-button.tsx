import {authClient} from "@/lib/auth-client";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {GeneratedAvatar} from "@/components/generated-avatar";
import {ChevronDownIcon, CreditCardIcon, LogOutIcon} from "lucide-react";
import {useRouter} from "next/navigation";

export const DashboardUserButton = () => {
    const router = useRouter();
    const {data, isPending} = authClient.useSession();

    const onLogout = () => {
        authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in");
                }
            }
        })
    }

    if (isPending || !data?.user) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="p-3 rounded-lg border border-border/10 w-full flex items-center justify-between bg-white/5 cursor-pointer hover:bg-white/8 overflow-hidden">
                {data.user.image ? (
                    <Avatar>
                        <AvatarImage src={data.user.image} />
                    </Avatar>
                ) : (
                    <GeneratedAvatar seed={data.user.name} variant="initials" className="size-10 mr-3" />
                )}

                <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
                    <p className="font-medium w-full">{data.user.name}</p>
                    <p className="text-sm w-full font-extralight">{data.user.email}</p>
                </div>
                <ChevronDownIcon className="size-7 shrink-0" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" side="right" className="w-72">
                <DropdownMenuLabel>
                    <div className="flex flex-col gap-1">
                        <span className="font-medium">{data.user.name}</span>
                        <span className="text-sm font-normal text-muted-foreground">{data.user.email}</span>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="flex items-center justify-between">
                    <span className="font-medium">Billing</span>
                    <CreditCardIcon className="text-gray-700 size-4" />
                </DropdownMenuItem>

                <DropdownMenuItem onClick={onLogout} className="flex items-center justify-between">
                    <span className="text-red-500 font-medium">Logout</span>
                    <LogOutIcon className="text-red-500 size-4" />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}