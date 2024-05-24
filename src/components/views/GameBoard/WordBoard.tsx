import React, { createContext, useContext, useEffect, useState } from "react";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import PlayerWord from "models/PlayerWord";
import WordButton from "./WordButton";
import { playerContext } from "./Game";
import WordMergeBar from "./WordMergeBar";
import { Button } from "components/ui/Button";

export const mergeWordListContext = createContext([]);

export const nextWordIndexContext = createContext(0);

const WordBoard = ({ playFunction }) => {
    const [mergeWordList, setMergeWordList] = useState<string[]>([]);
    const [nextWordIndex, setNextWordIndex] = useState<number>(0);
    const [searchWord, setSearchWord] = useState<string>("");
    const { player } = useContext(playerContext);
    const [wordList, setWordList] = useState([]);

    const filterWords = (words, searchTerm) =>
        words.filter(word => word.word.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const findNewWords = (currentWords, playerWords, searchTerm) =>
        playerWords.filter(playerWord =>
            !currentWords.some(word => word.word.name.toLowerCase() === playerWord.word.name.toLowerCase())
            && playerWord.word.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

    // add words to word list if there are new ones but don't add them if not in search
    useEffect(() => {
        setWordList(prevState => {
            const filteredWords = filterWords(prevState, searchWord);
            for (let word of filteredWords) {
                if (word.uses !== null && word.uses !== undefined && !isNaN(word.uses)) {
                    for (let playerWord of player.playerWords) {
                        if (playerWord.uses !== null && playerWord.uses !== undefined && !isNaN(playerWord.uses) && playerWord.word.name === word.word.name && playerWord.uses !== word.uses) {
                            word.uses = playerWord.uses;
                            break;
                        }
                    }
                }
            }
            const newWords = findNewWords(filteredWords, player.playerWords, searchWord);

            return [...filteredWords, ...newWords];
        });
    }, [player.playerWords]);

    // filter word list based on search input
    useEffect(() => {
        setWordList(player.playerWords.filter((playerWord) =>
            playerWord.word.name.toLowerCase().includes(searchWord.toLowerCase())));
    }, [searchWord]);

    const addWordToMerge = async (playerWord: PlayerWord) => {
        if (nextWordIndex === 2) {
            return;
        }

        let newWordIndex = nextWordIndex;
        let newWordList = mergeWordList;

        if (nextWordIndex === 0) {
            newWordList = [null, null, null];
        }

        newWordList[newWordIndex] = playerWord;
        newWordIndex++;

        if (playerWord.uses !== null && playerWord.uses !== undefined && !isNaN(playerWord.uses)) {
            playerWord.uses -= 1;
        }

        setNextWordIndex(newWordIndex);
        setMergeWordList(newWordList);
    };

    useEffect(() => {
        const executePlayFunction = async () => {
            if (nextWordIndex === 2) {
                const result = await playFunction(mergeWordList[0], mergeWordList[1]);
                setMergeWordList(prev => [...prev.slice(0, 2), result]);
                setNextWordIndex(0);
            }
        };

        executePlayFunction();
    }, [nextWordIndex]);

    const formatWord = (playerWord: PlayerWord) => {
        let result = playerWord.word.name;
        if (playerWord.uses !== null && playerWord.uses !== undefined && playerWord.uses > 0) {
            result += " " + playerWord.uses.toString();
        }

        return result;
    };

    const wordAvailable = (playerWord: PlayerWord) => {
        return playerWord.uses === null || playerWord.uses === undefined || playerWord.uses > 0;
    }

    const isNew = (playerWord: PlayerWord) => {
        if (playerWord !== null && playerWord !== undefined) {
            return playerWord.newlyDiscovered || playerWord.word.newlyDiscovered;
        }

        return false
    }

    const updateWordListUses = (toUpdatePlayerWord, uses) => {
        setWordList(prevState => {
            for (let word of prevState) {
                if (word.word.name === toUpdatePlayerWord.word.name) {
                    word.uses = uses;
                    break;
                }
            }

            return prevState;
        });
    };

    const removeWord = () => {
        if (nextWordIndex !== 1) {
            return;
        }

        if (mergeWordList[0].uses !== null && mergeWordList[0].uses !== undefined && !isNaN(mergeWordList[0].uses)) {
            updateWordListUses(mergeWordList[0], mergeWordList[0].uses + 1);
        }

        setNextWordIndex(0);
        setMergeWordList([null, null, null]);
    };

    // animation
    const startAnimation = (element) => {
        const keyframes = [
            { boxShadow: "0 0 8px 4px rgba(88, 80, 133, 0.8)", offset: 0 },
            { boxShadow: "0 0 10px 4px rgba(88, 80, 133, 1)", offset: 1 },
        ];

        const options = {
            duration: 2000,
            iterations: Infinity,
            direction: "alternate" as PlaybackDirection,
            easing: "ease-in-out",
        };

        let previousAnimation = null;
        for (let animation of document.getAnimations()) {
            if (animation.id === "word-glow-animation" &&
                animation.startTime !== null
            ) {
                previousAnimation = animation;
                break;
            }
        }
        const animatedElement = element.animate(keyframes, options);
        animatedElement.id = "word-glow-animation";
        if (previousAnimation !== null && previousAnimation.startTime !== null) {
            animatedElement.startTime = previousAnimation.startTime;
        }
    };

    const wordButtonRefs = wordList.map(() => React.createRef());
    // starts animation when the word button is rendered for the first time
    useEffect(() => {
        wordButtonRefs.forEach((ref) => {
            const element = ref.current;
            if (element && element.className === "primary-button word glow-board") {
                startAnimation(element);
            }
        });
    }, [wordList]);

    return (
        <BaseContainer className="game vertical-container">
            <mergeWordListContext.Provider value={{ mergeWordList, setMergeWordList }}>
                <nextWordIndexContext.Provider value={{ nextWordIndex, setNextWordIndex }}>
                    <WordMergeBar removeWordFunction={removeWord}></WordMergeBar>
                </nextWordIndexContext.Provider>
            </mergeWordListContext.Provider>
            <BaseContainer className="word-board container">
                <div className="search-bar">
                    <input className="search-input-css"
                        type="text"
                        value={searchWord}
                        onChange={(e) => setSearchWord(e.target.value)}
                        placeholder="Search words..."
                    />
                    <Button onClick={() => setSearchWord("")}>✖️</Button>
                </div>
                <div className="word-table">
                    {wordList.map((playerWord, index) => (
                        <WordButton
                            key={playerWord.word.name}
                            ref={wordButtonRefs[index]}
                            onClick={() => {
                                addWordToMerge(playerWord);
                            }}
                            className={isNew(playerWord) ? "glow-board" : ""}
                            disabled={!wordAvailable(playerWord)}
                        >
                            {formatWord(playerWord)}
                        </WordButton>
                    ))}
                </div>
            </BaseContainer>
        </BaseContainer>
    );
};

WordBoard.propTypes = {
    playFunction: PropTypes.func,
};

export default WordBoard;