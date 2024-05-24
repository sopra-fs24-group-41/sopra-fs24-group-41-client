import React from "react";
import { useNavigate } from "react-router-dom";
import BaseContainer from "../ui/BaseContainer";
import { Button } from "../ui/Button";
import "styles/views/Info.scss";

const Info = () => {
    const navigate = useNavigate();

    return (
        <BaseContainer>
            <div className="info container">
                <h1>Information</h1>
                <p>
                    No idea how all of this works? No problem, this page is here to help.
                </p>
                <h2>
                    How to create a lobby
                </h2>
                <p>
                    To create a lobby, you need to be logged in. Click on the Login button in the top left corner of the overview page.
                    No Account yet? Click the Sign up button to create one.
                    Once you are logged in click on &quot;create lobby&quot; in the overview page.
                    You will get redirected to the lobby page where you can choose the game mode and wait until your friends or other opponents joined.
                    (But you can also play alone)
                </p>
                <h2>
                    How to join a lobby
                </h2>
                <p>
                    You don&apos;t need an account to join an existing lobby. But you can only get achievements and
                    Choose an open lobby from the overview page.
                    The &quot;❌&quot; means that this lobby currently has an ongoing game and you have to wait until it is finished before you can join.
                    Try again later when the cross disappeared.
                </p>
                <h2>
                    How to start a game
                </h2>
                <p>
                    You have to be in a lobby and the lobby owner to start a game.
                    There are different game modes from which you can choose from:
                    <ul>
                        <li>
                            <b>Fusion Frenzy: </b>All players get the same target word and the same starting words, whoever gets to their target first, wins.
                        </li>
                        <li>
                            <b>Wombo Combo: </b>All players have different target words but the same starting words, the one that gets all their target words first, wins.
                            You can also get as many combinations as fast as possible as making combinations also gets you closer to the win.
                        </li>
                        <li>
                            <b>Finite Fusion: </b>The same as Fusion Frenzy, except this time you can&apos;t use words infinitely.
                            All players get the same target word and the same amount of uses on the same starting words.
                        </li>
                        <li>
                            <b>Standard: </b>Similar to the original <a href={"https://neal.fun/infinite-craft/"}>Infinite Craft</a>.
                            Explore combinations as long as you want.
                        </li>
                        <li>
                            <b>Daily Challenge: </b>You can only play this alone. The target word is the same for all players on the same day.
                            On the next day, a new target word gets selected. You can see how you did compared to others in the leaderboard view.
                            You can find the leaderboard in the same place as you find your profile.
                        </li>
                    </ul>
                </p>
                <h2>
                    What is this leaderboard and how do I get on it?
                </h2>
                <p>
                    The leaderboard displays all users that participated in the daily challenge today.
                    Start a lobby and select the game mode &quot;Daily Challenge&quot;.
                    You can only start a game with the daily challenge game mode when you are alone in the lobby.
                    Get to the target word and check the leaderboard again. You can find the leaderboard in the same place as you find your profile.
                </p>
                <h2>
                    How are the combinations generated?
                </h2>
                <p>
                    No we did not create all the combinations by hand. Every time you ask us to combine two words,
                    we check if some other player did the same combination before. If yes, we return the result that the other player already unlocked.
                    If we don&apos;t know the result word to your combination yet,
                    we ask an LLM (Large Language Model) what it thinks the combination of the two words you provided are.
                </p>
                <div className="info button-container">
                    <Button
                        width="100%"
                        onClick={() => navigate("/lobbyoverview")}
                    >
                        Return to Overview
                    </Button>
                </div>
            </div>
        </BaseContainer>
    );
};

export default Info;
