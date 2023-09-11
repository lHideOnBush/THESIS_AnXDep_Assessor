'use client'
import axios from "axios";
import { IResponse } from "../app/admin/IResponse"
import { useState } from "react"

interface PaginatedTableProps {
    responses: IResponse[]
}

export default function PaginatedTable({ responses }: PaginatedTableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [toEmail, setToEmail] = useState("");
    const [fromEmail, setFromEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const responsesPerPage = 10;
    // Logic for displaying submissions
    const indexOfLastSubmission = currentPage * responsesPerPage;
    const indexOfFirstSubmission = indexOfLastSubmission - responsesPerPage;
    const currentResponses = responses.slice(indexOfFirstSubmission, indexOfLastSubmission);

    // Logic for pagination
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(responses.length / responsesPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleClickPageNumber = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const onClickSendEmail = (email: string) => {
        setToEmail(email);
        toggleModal();
    }

    const onSubmitEmail = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        toggleModal();
        fetch("api/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ toEmail, fromEmail, subject })
        }).then(() => {
            console.log("success");
            setSubject("");
            setFromEmail("");
            setToEmail("");
        })

    }

    return <>
        {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-40">
                <div className="bg-white rounded-lg p-8 w-3/4  lg:w-1/2 shadow-lg">
                    <h2 className="text-lg font-bold mb-4">Compose Email</h2>
                    <form onSubmit={onSubmitEmail}>
                        <div className="mb-4">
                            <label htmlFor="fromEmail" className="block text-gray-700">
                                From Email:
                            </label>
                            <input
                                value={fromEmail}
                                onChange={(e) => {
                                    setFromEmail(e.target.value);
                                }}
                                id="fromEmail"
                                type="email"
                                className="border border-gray-400 p-2 rounded w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="toEmail" className="block text-gray-700">
                                To Email:
                            </label>
                            <input

                                value={toEmail}
                                onChange={(e) => {
                                    setToEmail(e.target.value);
                                }}
                                id="toEmail"
                                type="email"
                                className="border border-gray-400 p-2 rounded w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="subject" className="block text-gray-700"> Subject: </label>
                            <textarea
                                value={subject}
                                onChange={(e) => {
                                    setSubject(e.target.value);
                                }}

                                className="border border-gray-400 p-2 rounded w-full"
                                id="subject" rows={4} cols={50}>
                            </textarea>
                        </div>
                        <div className="flex justify-end">
                            <button
                                // onClick={toggleModal}
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Send
                            </button>
                            <button
                                type="button"
                                className="ml-2 text-gray-500 hover:text-gray-700"
                                onClick={toggleModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}
        <div className="overflow-x-auto w-5/6 text-sm md:text-base md:w-3/4">
            <table className="bg-white border border-gray-300 shadow-md min-w-full">
                <thead>
                    <tr>
                        <th className="px-6 py-3 bg-gray-100 border-b border-gray-300 text-left">Created At</th>
                        <th className="px-6 py-3 bg-gray-100 border-b border-gray-300 text-left">BDI</th>
                        <th className="px-6 py-3 bg-gray-100 border-b border-gray-300 text-left">BAI</th>
                        <th className="px-16 py-3 bg-gray-100 border-b border-gray-300 text-left">Comment</th>
                        <th className="px-16 py-3 bg-gray-100 border-b border-gray-300 text-left">User</th>
                        <th className="px-6 py-3 bg-gray-100 border-b border-gray-300 text-left">Age</th>
                        <th className="px-6 py-3 bg-gray-100 border-b border-gray-300 text-left">Gender</th>
                        <th className="px-6 py-3 bg-gray-100 border-b border-gray-300 text-left">College</th>
                        <th className="px-6 py-3 bg-gray-100 border-b border-gray-300 text-left">Course</th>
                        <th className="px-6 py-3 bg-gray-100 border-b border-gray-300 text-left">Email</th>
                        <th scope="col" className="right-48 md:sticky px-2 py-3 bg-gray-100">Score CLF</th>
                        <th scope="col" className="right-24 md:sticky px-2 py-3 bg-gray-100">Comment CLF</th>
                        <th scope="col" className="right-0 sticky px-2 py-3 bg-gray-100">Send Email</th>
                    </tr>
                </thead>
                <tbody>
                    {currentResponses.map((item, index) => {
                        const date = item.createdAt.toDate();
                        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
                        const parsedCommentPrediction: { predicted: string } = item.commentClf !== undefined ? JSON.parse(item.commentClf!) : { predicted: "" };
                        const parsedScorePrediction: { predicted: string } = item.scoreClf !== undefined ? JSON.parse(item.scoreClf!) : { predicted: "" };
                        return (
                            <tr key={index}>
                                <td className="px-6 py-4 border-b border-gray-300">{formattedDate}</td>
                                <td className="px-6 py-4 border-b border-gray-300">{item.bdi}</td>
                                <td className="px-6 py-4 border-b border-gray-300">{item.bai}</td>
                                <td className="px-6 py-4 border-b border-gray-300">{item.comment}</td>
                                <td className=" py-4 border-b border-gray-300">{item.user.username}</td>
                                <td className="px-6 py-4 border-b border-gray-300">{item.user.age}</td>
                                <td className="px-6 py-4 border-b border-gray-300">{item.user.gender == 0 ? "Male" : "Female"}</td>
                                <td className="px-6 py-4 border-b border-gray-300">{item.user.college}</td>
                                <td className="px-6 py-4 border-b border-gray-300">{item.user.course}</td>
                                <td className="px-6 py-4 border-b border-gray-300">{item.user.email}</td>
                                <td className="right-48 text-white md:sticky px-6 py-4 border-b bg-slate-500 border-gray-300">{parsedScorePrediction.predicted.toUpperCase()}</td>
                                <td className="right-24 text-white md:sticky px-6 py-4 border-b bg-slate-500 border-gray-300">{parsedCommentPrediction.predicted.toUpperCase()}</td>
                                <td scope="row" className={`right-0 sticky border bg-gray-100 hover:bg-gray-300 px-6 py-4 font-medium text-sm md:text-lg text-gray-900`}>
                                    <button onClick={() => onClickSendEmail(item.user.email)} className="">
                                        Send
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            aria-label="Gmail" role="img"
                                            viewBox="0 0 512 512"><rect
                                                width="512" height="512"
                                                rx="15%"
                                                fill="#ffffff" /><path d="M158 391v-142l-82-63V361q0 30 30 30" fill="#4285f4" /><path d="M 154 248l102 77l102-77v-98l-102 77l-102-77" fill="#ea4335" /><path d="M354 391v-142l82-63V361q0 30-30 30" fill="#34a853" /><path d="M76 188l82 63v-98l-30-23c-27-21-52 0-52 26" fill="#c5221f" /><path d="M436 188l-82 63v-98l30-23c27-21 52 0 52 26" fill="#fbbc04" /></svg>
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {/* Pagination */}
            <div className="flex justify-start mt-4">
                {pageNumbers.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        className={`mx-1 px-3 py-1 rounded-md ${pageNumber === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                            }`}
                        onClick={() => handleClickPageNumber(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
            <div className="mb-4"></div>
        </div>
    </>;
}