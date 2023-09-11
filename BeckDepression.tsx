import { useState, useEffect } from "react";

let bdiQuestions = [
    {
        "0": "I do not feel sad.",
        "1": "I feel sad",
        "2": "I am sad all the time and I can't snap out of it. ",
        "3": "I am so sad and unhappy that I can't stand it. "
    },
    {

        "0": "I am not particularly discouraged about the future. ",
        "1": "I feel discouraged about the future. ",
        "2": "I feel I have nothing to look forward to",
        "3": "I feel the future is hopeless and that things cannot improve"
    },
    {
        "0": "I do not feel like a failure. ",
        "1": "I feel I have failed more than the average person. ",
        "2": "As I look back on my life, all I can see is a lot of failures. ",
        "3": "I feel I am a complete failure as a person. "
    },
    {
        "0": "I get as much satisfaction out of things as I used to. ",
        "1": "I don't enjoy things the way I used to. ",
        "2": "I don't get real satisfaction out of anything anymore. ",
        "3": "I am dissatisfied or bored with everything. "
    },
    {
        "0": "I don't feel particularly guilty ",
        "1": "I feel guilty a good part of the time. ",
        "2": "I feel quite guilty most of the time. ",
        "3": "I feel guilty all of the time. "
    },
    {
        "0": "I don't feel I am being punished",
        "1": "I feel I may be punished. ",
        "2": "I expect to be punished. ",
        "3": "I feel I am being punished. "
    },
    {
        "0": "I don't feel disappointed in myself. ",
        "1": "I am disappointed in myself.",
        "2": "I am disgusted with myself.  ",
        "3": "I hate myself. "
    },
    {
        "0": "I don't feel I am any worse than anybody else",
        "1": "I am critical of myself for my weaknesses or mistakes. ",
        "2": "I blame myself all the time for my faults. ",
        "3": "I blame myself for everything bad that happens. "
    },
    {
        "0": "I don't have any thoughts of killing myself",
        "1": "I have thoughts of killing myself, but I would not carry them out. ",
        "2": "I would like to kill myself.",
        "3": "I would kill myself if I had the chance.  "
    },
    {
        "0": "I don't cry any more than usual. ",
        "1": "I cry more now than I used to.",
        "2": "I cry all the time now. ",
        "3": "I used to be able to cry, but now I can't cry even though I want to."
    },
    {
        "0": "I am no more irritated by things than I ever was. ",
        "1": "I am slightly more irritated now than usual. ",
        "2": "I am quite annoyed or irritated a good deal of the time. ",
        "3": "I feel irritated all the time. "
    },
    {
        "0": "I have not lost interest in other people. ",
        "1": "I am less interested in other people than I used to be. ",
        "2": "I have lost most of my interest in other people. ",
        "3": "I have lost all of my interest in other people. "
    },
    {
        "0": "I have lost all of my interest in other people. ",
        "1": "I put off making decisions more than I used to. ",
        "2": "I have greater difficulty in making decisions more than I used to.",
        "3": "I can't make decisions at all anymore. "
    },
    {
        "0": "I don't feel that I look any worse than I used to.  ",
        "1": "I am worried that I am looking old or unattractive. ",
        "2": "I feel there are permanent changes in my appearance that make me look unattractive",
        "3": "I believe that I look ugly"
    },
    {
        "0": "I can work about as well as before. ",
        "1": "It takes an extra effort to get started at doing something. ",
        "2": "I have to push myself very hard to do anything. ",
        "3": "I can't do any work at all. "
    },
    {
        "0": "I can sleep as well as usual",
        "1": "I don't sleep as well as I used to. ",
        "2": "I wake up 1-2 hours earlier than usual and find it hard to get back to sleep",
        "3": "I wake up several hours earlier than I used to and cannot get back to sleep. "
    },
    {
        "0": "I don't get more tired than usual. ",
        "1": "I get tired more easily than I used to. ",
        "2": "I get tired from doing almost anything. ",
        "3": "I am too tired to do anything. "
    },
    {
        "0": "My appetite is no worse than usual. ",
        "1": "My appetite is not as good as it used to be.  ",
        "2": "My appetite is much worse now. ",
        "3": "I have no appetite at all anymore. "
    },
    {
        "0": "I haven't lost much weight, if any, lately. ",
        "1": "I have lost more than five pounds. ",
        "2": "I have lost more than ten pounds. ",
        "3": "I have lost more than fifteen pounds. "
    },
    {
        "0": "I am no more worried about my health than usual.",
        "1": "I am worried about physical problems like aches, pains, upset stomach, or constipation",
        "2": "I am very worried about physical problems and it's hard to think of much else. ",
        "3": "I am so worried about my physical problems that I cannot think of anything else. "
    },
    {
        "0": "I have not noticed any recent change in my interest in sex. ",
        "1": "I am less interested in sex than I used to be. ",
        "2": "I have almost no interest in sex",
        "3": "I have lost interest in sex completely.  "
    },
]
export default function BeckDepression({ bdi, setBdi }: { bdi: any, setBdi: any }) {
    const [selectedBdiQuestion, setSelectedBdiQuestion] = useState(bdiQuestions[0]);
    const [selectedIndex, setSelectedIndex] = useState(Object.values(bdi).length - 1);
    const [percentBar, setPercentBar] = useState(selectedIndex);
    const [answering, setAnswering] = useState(false);

    const id = localStorage.getItem("id");

    useEffect(() => {
        setAnswering(id !== null);
    }, [id])

    const clickNewWindowSummary = () => {
        window.open(`/beck-inventory-test/summary?score=${bdi.total}&summary=1&level=${depressionLevel(bdi.total)}`, 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=400,height=350')
    }
    const handleClick = (e: any) => {
        if (Object.values(bdi).length === 22) return;

        let indexIncrement = Math.min(selectedIndex + 1, bdiQuestions.length - 1);
        setSelectedIndex(indexIncrement);
        setSelectedBdiQuestion(bdiQuestions[indexIncrement]);
        const score = parseInt(e.target.value);
        setBdi((prev: any) => ({ ...prev, [selectedIndex]: parseInt(e.target.value), total: prev.total + score }));

        const percent = Math.ceil(((indexIncrement + 1) / bdiQuestions.length) * 100);
        // const percentBarCSS = `<div> w-[${percent}px] h-4 bg-emerald-600 absolute </div>`;
        // console.log(selectedIndex, indexIncrement, percent);

        setPercentBar(percent);
    };

    const scoreBG = (total: number) => {
        if (total <= 10) {
            return "bg-green-500";
        } else if (total <= 16) {
            return "bg-pink-500";
        } else if (total <= 20) {
            return "bg-yellow-500";
        } else if (total <= 30) {
            return "bg-amber-500";
        } else if (total <= 40) {
            return "bg-orange-500";
        } else {
            return "bg-red-500";
        }
    };
    const scoreDescription = (total: number) => {
        if (total <= 10) {
            return "These ups and downs are considered normal ";
        } else if (total <= 16) {
            return "Mild mood disturbance ";
        } else if (total <= 20) {
            return "Borderline clinical depression";
        } else if (total <= 30) {
            return "Moderate depression ";
        } else if (total <= 40) {
            return "Severe depression";
        } else {
            return "Extreme depression";
        }
    }

    const depressionLevel = (total: number) => {
        if (total <= 10) {
            return 0;
        } else if (total <= 16) {
            return 1;
        } else if (total <= 20) {
            return 2;
        } else if (total <= 30) {
            return 3;
        } else if (total <= 40) {
            return 4;
        } else {
            return 5;
        }

    }

    const ShowDepressionDescription = () => {
        return <main className="flex items-center flex-col justify-center">
            <div className="h-5"></div>
            <div className="space-x-2 m-3">Everyone experiences sadness at some point, but if it&apos;s interfering with daily life, you may be experiencing depression. Take this depression test to determine the extent of your symptoms and assess the risk of developing a depressive disorder. The test involves examining statements and indicating how well they describe you or how often you feel that way. The results will help you determine if you should consider seeking help.</div>
            <div className="h-5"></div>
            <button className=" text-white p-2 shadow-md rounded-md bg-emerald-500 hover:bg-emerald-400" onClick={() => { setAnswering(true) }}>Take the Test</button>
        </main>
    }

    const ShowQuestionsOrResult = () => {
        return <main className="flex  items-center flex-col justify-center">
            {(Object.values(bdi).length === 22 || id !== null) ? <>
                <div className={`p-8 text-center text-white font-extrabold text-2xl rounded-md ${scoreBG(bdi.total)}`}>
                    Your Score is: <span>{bdi.total}</span><br />
                    <span>{scoreDescription(bdi.total)}</span></div>
                <button onClick={clickNewWindowSummary} className="text-white mt-5 disabled:bg-gray-400 bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Summary</button>
            </> :
                <>
                    <div
                        className="rounded-xl shadow-sm m-4 lg:mx-40 bg-gray-200 p-2"
                        x-data="app"
                    >
                        <div className="shadow-sm">
                            <input type="radio" name="option" onClick={handleClick} value={"0"} id="1" className="peer hidden" />
                            <label htmlFor="1"
                                className="block cursor-pointer select-none rounded-xl p-2 text-center hover:bg-blue-500 hover:text-white peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
                            >{selectedBdiQuestion[0]}</label >
                        </div>

                        <div className="shadow-sm">
                            <input type="radio" name="option" onClick={handleClick} value={"1"} id="2" className="peer hidden" />
                            <label htmlFor="2"
                                className="block cursor-pointer select-none rounded-xl p-2 text-center hover:bg-yellow-500 hover:text-white peer-checked:bg-yellow-500 peer-checked:font-bold peer-checked:text-white"
                            >{selectedBdiQuestion[1]}</label >
                        </div>

                        <div className="shadow-sm">
                            <input type="radio" name="option" onClick={handleClick} value={"2"} id="3" className="peer hidden" />
                            <label htmlFor="3"
                                className="block cursor-pointer select-none rounded-xl p-2 text-center hover:bg-orange-500 hover:text-white peer-checked:bg-orange-500 peer-checked:font-bold peer-checked:text-white"
                            >{selectedBdiQuestion[2]}</label >
                        </div>

                        <div className="shadow-sm">
                            <input type="radio" name="option" onClick={handleClick} value={"3"} id="4" className="peer hidden" />
                            <label htmlFor="4"
                                className="block cursor-pointer select-none rounded-xl p-2 text-center hover:bg-red-500 hover:text-white peer-checked:bg-red-500 peer-checked:font-bold peer-checked:text-white"
                            >{selectedBdiQuestion[3]}</label >
                        </div>
                    </div>
                </>}
        </main>
    }
    return <>
        <div className="flex justify-between">

            <h3 className="m-4 text-xl font-bold leading-none text-gray-900 ">Beck Depression Inventory</h3>
            <div className="flex flex-row items-center mr-2">
                <h3 className="mr-2 text-sm leading-none text-gray-900 ">{selectedIndex + 1} / {bdiQuestions.length}</h3>
                <div className="flex flex-row">

                    <div className="border-2 rounded-full w-24 h-4 bg-slate-400">
                        <div className="flex rounded-full w-24 h-3 bg-emerald-500" style={{ "width": `${percentBar}%` }}>
                        </div>
                        <div className="text-center justify-center text-sm text-black" >{percentBar}%</div>
                    </div>
                </div>
            </div>
        </div>

        {answering ? <ShowQuestionsOrResult /> : <ShowDepressionDescription />}
    </>
}