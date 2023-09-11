import React from "react";

interface Params {
    handleSubmit(e: React.FormEvent<HTMLFormElement>): void;
    buttonRef: React.LegacyRef<HTMLButtonElement>;
    registerData: { username: string, age: number, email: string, college: string, course: string, gender: number };
    setRegisterData: any;
}

export default function Register({ handleSubmit, buttonRef, registerData, setRegisterData }: Params) {
    const handleOnClickGender = (e: any) => {
        const gender = parseInt(e.target.value);
        setRegisterData((prevState: any) => ({ ...prevState, gender: gender }))
    }

    return <form onSubmit={handleSubmit} id='register' className="m-4">
        <h3 className="mb-4 text-lg font-semibold leading-none text-gray-900 ">User Info</h3>
        <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                <input value={registerData.username} onChange={(e) => setRegisterData((prevState: any) => ({ ...prevState, username: e.target.value }))} type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="Full name" required />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">Age</label>
                <input value={registerData.age} onChange={(e) => setRegisterData((prevState: any) => ({ ...prevState, age: e.target.value }))} type="number" name="age" id="age" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="" required />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                <input value={registerData.email} onChange={(e) => setRegisterData((prevState: any) => ({ ...prevState, email: e.target.value }))} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="name@email.com" required />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">College</label>
                {/* <input value={registerData.college} onChange={(e) => setRegisterData((prevState: any) => ({ ...prevState, college: e.target.value }))} type="text" name="college" id="college" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="CCSICT" required /> */}
                <select value={registerData.college} onChange={(e) => setRegisterData((prevState: any) => ({ ...prevState, college: e.target.value }))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
                    <option selected ></option>
                    <option value={"CCSICT"}>CCSICT</option>
                </select>
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">Course</label>
                {/* <input value={registerData.course} onChange={(e) => setRegisterData((prevState: any) => ({ ...prevState, course: e.target.value }))} type="text" name="course" id="course" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="BSCS" required /> */}
                <select value={registerData.course} onChange={(e) => setRegisterData((prevState: any) => ({ ...prevState, course: e.target.value }))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
                    <option selected ></option>
                    <option value={"BSCS"}>BSCS</option>
                    <option value={"BSIT"}>BSIT</option>
                    <option value={"BSIS"}>BSIS</option>
                    <option value={"BLIS"}>BLIS</option>
                </select>
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">Gender</label>
                <div
                    className="flex justify-around rounded-xl bg-gray-100 border border-solid "
                >
                    <div>
                        <input type="radio" name="option" checked={registerData.gender === 0} onChange={handleOnClickGender} value={"0"} id="1" className="peer hidden" required />
                        <label htmlFor="1"
                            className="block cursor-pointer select-none rounded-xl p-5 w-24 text-center hover:bg-blue-500 hover:text-white peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
                        >Male</label >
                    </div>
                    <div>
                        <input type="radio" name="option" checked={registerData.gender === 1} onChange={handleOnClickGender} value={"1"} id="2" className="peer hidden" required />
                        <label htmlFor="2"
                            className="block cursor-pointer select-none rounded-xl p-5 w-24 text-center hover:bg-red-500 hover:text-white peer-checked:bg-red-500 peer-checked:font-bold peer-checked:text-white"
                        >Female</label >
                    </div>
                </div>
            </div>
        </div>
        <button type="submit" ref={buttonRef} hidden></button>
    </form>
}