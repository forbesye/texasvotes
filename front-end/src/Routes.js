import Splash from "./views/Splash/Splash"
import About from "./views/About/About"
import Politicians from "./views/Politicians/Politicians"
import Districts from "./views/Districts/Districts"
import Elections from "./views/Elections/Elections"
import VoterFAQ from "./views/VoterFAQ/VoterFAQ"

const Routes = [
    {
        title: "Home",
        path: "/",
        exact: true,
        Component: Splash
    },
    {
        title: "About",
        path: "/about",
        Component: About
    },
    {
        title: "Politicians",
        path: "/politicians",
        linkPath: "/politicians/view",
        Component: Politicians
    },
    {
        title: "Districts",
        path: "/districts",
        linkPath: "/districts/view",
        Component: Districts
    },
    {
        title: "Elections",
        path: "/elections",
        linkPath: "/elections/view",
        Component: Elections
    },
    {
        title: "Voting FAQ",
        path: "/voting",
        Component: VoterFAQ
    }
]

export default Routes