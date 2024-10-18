
import backgroundImage from '../../../public/asset/drive.avif'

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { locationData } from "../../../public/locationData";
// import { IoEye, IoEyeOff } from "react-icons/io5";

const DriverSignUp = () => {

    // const [showPassword, setShowPassword] = useState(false);
    const [selectedDivision, setSelectedDivision] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [districts, setDistricts] = useState([]);
    const [upazillas, setUpazillas] = useState([]);
    const navigate = useNavigate();
    // console.log(' use email :' ,email)
    

    const handleDivisionChange = (e) => {
        const division = e.target.value;
        setSelectedDivision(division);
        setSelectedDistrict('');
        setUpazillas([]);
        setDistricts(Object.keys(locationData[division] || {}));
    };

    const handleDistrictChange = (e) => {
        const district = e.target.value;
        setSelectedDistrict(district);
        setUpazillas(locationData[selectedDivision][district] || []);
    };


    const handleImageUpload = async (e) => {
        const imageFile = e.target.files[0];
        if (!imageFile) {
            console.error("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append("image", imageFile);

        try {
            const response = await axios.post("https://api.imgbb.com/1/upload?key=0873ad3ca7a49d847f0ce5628d0e79ee",
                formData
            );

            const imageUrl = response.data.data.display_url;
            console.log("Image uploaded:", imageUrl);
            return imageUrl;
        } catch (error) {
            console.error("Image upload failed:", error);
        }
    };

    const handleJoin = async (e) => {
        e.preventDefault()
        const form = e.target;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const userEmail = form.email.value;
        const phone = form.phone.value;
        const nid = form.nid.value;
        const gender = form.gender.value;
        const division = form.division.value;
        const district = form.district.value;
        const upazilla = form.upazilla.value;
        const localAddress = form.localAddress.value;
        const dateOfBirth = e.target.birthDay.value;
        const userRole = "driver"
        const accountStatus = "not verified"
        const createdAt = new Date()
        

        const imageFile = form.photo.files[0];
        // console.log(imageFile.name)
        const image = await handleImageUpload({ target: { files: [imageFile] } });
        const info = { firstName, lastName, userEmail, phone, gender, image, dateOfBirth, nid, userRole, accountStatus, createdAt, district, division,upazilla, localAddress };

        try {

            // await mutateAsync(info)
            navigate('/join/driverInfo', { state: { info } });

        } catch (error) {
            console.log(error)
        }


    }

   
    return (
        <div >
            <div style={{ backgroundImage: `url(${backgroundImage})` }} className=' min-h-screen overflow-hidden bg-center bg-cover bg-no-repeat pt-10'>
                <div className='text-center mx-auto '>
                    <h1 className="text-3xl lg:text-3xl font-bold  font-merriweather mb-10">Please Register as a driver</h1>
                </div>
                <div className=" lg:mt-20">
                    <div className="h-[100vh] bg-center bg-cover bg-no-repeat">
                        <div className='lg:w-[30vw] bg-transparent lg:bg-[#fdfefe33] mx-auto px-10 py-10 rounded-lg'>
                            <div className='text-center mx-auto ' >
                                <h1 className="text-xl lg:text-xl font-bold  font-merriweather lg:mt-0 lg;mt-16  mb-10">Enter Your Information here</h1>
                            </div>
                            <section className='mt-3'>
                                <form
                                    onSubmit={handleJoin}
                                    className='font-nunito'>
                                    <div className='flex gap-10'>
                                        <input
                                            type="text"
                                            name="firstName"
                                            id="firstName"
                                            className='outline-none border w-full rounded py-1 lg:py-2 px-2 text-secondary'
                                            placeholder='Your Name'
                                            required />

                                        <input
                                            type="text"
                                            name="lastName"
                                            id="lastName"
                                            className='outline-none border w-full rounded py-1 lg:py-2 px-2 text-secondary'
                                            placeholder='Last Name'
                                            required />
                                    </div>

                                    <div className='mt-3 relative space-y-3'>
                                        <div className="flex justify-between gap-10 items-center">
                                            <div className="w-full">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    className='outline-none border w-full rounded py-1 lg:py-2 px-2 text-secondary'
                                                    placeholder='Email'
                                                    required />
                                            </div>
                                            <div className="w-full">
                                                {/* <input
                                                    type={showPassword ? "text" : "password"}
                                                    name="password"
                                                    id="password"
                                                    className='outline-none border w-full rounded py-1 lg:py-2 px-2 text-secondary'
                                                    placeholder='Password'
                                                    required />
                                                <span
                                                    className='absolute top-2 lg:top-3 right-3 text-xl'
                                                    onClick={() => setShowPassword(!showPassword)}>
                                                    {showPassword ? <IoEyeOff></IoEyeOff> : <IoEye></IoEye>}
                                                </span> */}
                                                {/* {errorMessage && <h1 className='text-red-500 text-xs  p-2 rounded-lg flex items-center'>{errorMessage}</h1>} */}
                                            </div>
                                        </div>
                                        <div className='space-y-4'>
                                            <input
                                                type="text"
                                                name="phone"
                                                id="phone"
                                                className='outline-none border w-full rounded py-1 lg:py-2 px-2 text-secondary'
                                                placeholder='Phone number'
                                                defaultValue="+880"
                                                required />
                                            <input
                                                type="text"
                                                name="nid"
                                                id="nid"
                                                className='outline-none border w-full rounded py-1 lg:py-2 px-2 text-secondary'
                                                placeholder='Your Nid'
                                                onInput={(e) => e.target.value = e.target.value.toUpperCase()}
                                                required />
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <select
                                                name="gender"
                                                id="gender"
                                                className='outline-none border w-[45%] rounded py-1 lg:py-2 px-2 text-secondary'
                                                required>
                                                <option defaultChecked className='text-gray-400'>Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="others">Others</option>
                                            </select>
                                            <input
                                                type="date"
                                                name="birthDay"
                                                id="birthDay"
                                                placeholder='Birth date'
                                                className='w-[45%] border outline-none rounded py-1 lg:py-2 px-2 text-secondary' />
                                        </div>
                                        <h3 className='text-lg font-semibold text-white'>Address:</h3>
                                        <div className='flex justify-between'>
                                            <select name="division" onChange={handleDivisionChange}
                                                id="division"
                                                className='outline-none border w-[30%] rounded py-1 lg:py-2 px-2 text-secondary'
                                                required>
                                                <option defaultChecked className='text-gray-400'>Division</option>
                                                {Object.keys(locationData).map((division) => (
                                                    <option key={division} value={division}>
                                                        {division}
                                                    </option>
                                                ))}
                                            </select>
                                            {districts && (<select name="district" onChange={handleDistrictChange}
                                                id="district"
                                                className='outline-none border w-[33%] rounded py-1 lg:py-2 px-2 text-secondary'
                                                required>
                                                <option defaultChecked className='text-gray-400'>District</option>
                                                {districts.map((district) => (
                                                    <option key={district}>{district}</option>
                                                ))}
                                            </select>
                                            )}
                                            {upazillas && (
                                                <select
                                                    name='upazilla'
                                                    id='upazilla'
                                                    className='outline-none border w-[33%] rounded py-1 lg:py-2 px-2 text-secondary'
                                                    required>
                                                    <option value="">Upazilla</option>
                                                    {upazillas.map((upazilla) => (
                                                        <option
                                                            key={upazilla}
                                                            value={upazilla}>
                                                            {upazilla}
                                                        </option>
                                                    ))}
                                                </select>
                                            )}
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                name="localAddress"
                                                id="localAddress"
                                                className='outline-none border w-full rounded py-1 lg:py-2 px-2 text-secondary'
                                                placeholder='Enter House/road no'
                                                required />
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                name="photo"
                                                accept="image/*"
                                                id="photo-upload"
                                                onChange={(e) => handleImageUpload(e)}
                                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                            />
                                            <label
                                                htmlFor="photo-upload"
                                                className="border-2 border-dashed border-white p-2 w-full  outline-none rounded py-1 lg:py-2 px-2 text-white flex items-center justify-center cursor-pointer"
                                            >
                                                Upload your photo
                                            </label>
                                        </div>
                                    </div>


                                    <div className='pb-10 mt-5 flex justify-between'>
                                        <Link to={'/join/signUpOne'}>
                                            <button className="relative inline-block px-4 py-2 font-medium group">
                                                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-primary group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                                                <span className="absolute inset-0 w-full h-full bg-white border-2 border-primary group-hover:bg-black"></span>
                                                <span className="relative text-black group-hover:text-white">Go Back</span>
                                            </button>
                                        </Link>
                                        <button className="relative inline-block px-4 py-2 font-medium group">
                                            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-primary group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                                            <span className="absolute inset-0 w-full h-full bg-white border-2 border-primary group-hover:bg-black"></span>
                                            <span className="relative text-black group-hover:text-white">Next</span>
                                        </button>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DriverSignUp;