import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
const App = () => {
    useEffect(() => {
        // Just route the user to Storybook docs on load
        window.location.assign("https://storybook.cherrytopframework.pro/?path=/docs/configure-your-project--documentation");
    }, []);
    return (
        <div style={{ textAlign: "center", marginTop: "25%" }}>
            <h1>Cherrytopframework (Library)</h1>
            <CircularProgress />
            <p>Visit <a>Cherrytopframework (Docs)</a></p>
            <p>and <a>Cherrytopframework (Storybook)</a></p>
            <p>to get the full run down on how the Microcomponent framework works and how to get started.</p>
        </div>
    );
};

export default App;
