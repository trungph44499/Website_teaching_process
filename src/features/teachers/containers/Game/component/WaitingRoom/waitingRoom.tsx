import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import styles from "./waitingRoom.module.css"

function WaitingRoom({ pin, socket }: any) {
    console.log("pin", pin)
    // console.log("socketwaitting", socket)
    const [playerList, setPlayerList] = useState<any>([])
    // const isLanguageEnglish = useSelector((state:any) => state.language.isEnglish)

    useEffect(() => {
        socket?.on("player-added", (player:any) => {
            setPlayerList([...playerList, player])
        })
    }, [playerList, socket])

    return (
        <div className={styles["waiting-room"]}>
            <h1 className={styles["title"]}>
                Waiting room
            </h1>
            <h2 className={styles["header"]}>
                Show PIN to your students: {pin}
            </h2>
            <div className={styles["players-list"]}>
                <div className={styles["leaderboard"]}>
                    <h1 className={styles["leaderboard-title"]}>
                        Player List
                    </h1>
                    {playerList.length > 0 ? (
                        <ol>
                            {playerList.map((player:any) => (
                                <li>
                                    <mark>{player.userName}</mark>
                                    <small>Student</small>
                                </li>
                            ))}
                        </ol>
                    ) : (
                        <h1 className={styles["leaderboard-title"]}>
                                "No players yet"
                        </h1>
                    )}
                </div>
            </div>
        </div>
    )
}

export default WaitingRoom
