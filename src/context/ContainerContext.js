import { ThemeProvider } from "./ThemeContext";
import { UserInfoProvider } from "./UserInfoContext";
import { StationsProvider } from "./StationsContext";

function ContainerContext({ children }) {
    return (
        <ThemeProvider>
            <UserInfoProvider>
                <StationsProvider>
                    {children}
                </StationsProvider>
            </UserInfoProvider>
        </ThemeProvider>
    )
}

export default ContainerContext;