import { Link, useNavigate } from "react-router-dom";
import { locationData } from "../../../public/locationData";
import { useState } from "react";
import image from '../../../public/asset/agency-image2.jpg'
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import UseAuth from "../../hooks/UseAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";



const AgencyRegister = () => {
    const { createUser, updateUserProfile } = UseAuth() || {}
    const [selectedDivision, setSelectedDivision] = useState('');
    const [email, setUserEmail] = useState('')
    // const [errorMessage, setErrorMessage] = useState(null)
    // eslint-disable-next-line no-unused-vars
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [districts, setDistricts] = useState([]);
    const [upazillas, setUpazillas] = useState([]);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic()
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


    const { mutateAsync } = useMutation({
        mutationFn: async (ownerData) => {
            const { data } = await axiosPublic.post(`https://go-wheels-server.vercel.app/api/usersRoute/ownerInfo`, ownerData)
            return data
        },
        onSuccess: () => {
            console.log('data saved successfully')
            // toast.success(' data added successfully')
            navigate('/join/agencyInfo', { state: { email } });


        }

    })

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
        const password = form.password.value;
        const phone = form.phone.value;
        const nid = form.nid.value;
        const gender = form.gender.value;
        const division = form.division.value;
        const district = form.district.value;
        const upazilla = form.upazilla.value;
        const localAddress = form.localAddress.value;
        const dateOfBirth = e.target.birthDay.value;
        const createdAt = new Date()
        const userRole = "agency"
        const accountStatus = "not verified"
        setUserEmail(userEmail)

        const imageFile = form.photo.files[0];
        // console.log(imageFile.name)
        const image = await handleImageUpload({ target: { files: [imageFile] } });

        const userAddress = {
            division,
            district,
            upazilla,
            localAddress
        }

        const ownerInfo = { firstName, lastName, userEmail, phone, gender, image, userAddress, dateOfBirth, nid, userRole, accountStatus, createdAt };
        console.log(ownerInfo)

        // const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
        // setErrorMessage('');

        // if (password.length < 6) {
        //     setErrorMessage("Your password should be at least 6 character!")
        //     return
        // }
        // if (!regex.test(password)) {
        //     setErrorMessage('Password must contain at least one capital letter, one small letter, one number and one special character')
        //     return
        // }


        try {
            const userCreate = await createUser(userEmail, password)
            console.log(userCreate)


            const fullName = `${firstName} ${lastName}`
            const updateProfile = await updateUserProfile(fullName, image)
            console.log(updateProfile)

            await mutateAsync(ownerInfo)

        } catch (error) {
            console.log(error)
        }


    }
    // style={{ backgroundImage: `url(${background})` }}
    return (
        <div>
            <div className='text-center mx-auto pt-5'>
                <h1 className="text-3xl lg:text-3xl font-bold  font-merriweather mb-10">Owner Information</h1>
            </div>
            <div className="flex flex-col-reverse lg:flex-row  gap-44 justify-center mt-20">
                <div className="h-[100vh] bg-center bg-cover bg-no-repeat">
                    <div className='lg:w-[30vw] bg-transparent lg:bg-[#fdfefe33] mx-auto px-10 rounded-lg'>
                        <div className='text-center mx-auto ' >
                            <h1 className="text-xl lg:text-xl font-bold  font-merriweather lg:mt-0 mt-16  mb-10">Enter Information here</h1>
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
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                className='outline-none border w-full rounded py-1 lg:py-2 px-2 text-secondary'
                                                placeholder='Password'
                                                required />
                                            {/* {errorMessage && <h1 className='text-red-500 text-xs  p-2 rounded-lg flex items-center'>{errorMessage}</h1>} */}
                                        </div>
                                    </div>
                                    <div className='space-y-4'>
                                        <input
                                            type="number"
                                            name="phone"
                                            id="phone"
                                            className='outline-none border w-full rounded py-1 lg:py-2 px-2 text-secondary'
                                            placeholder='Phone number'
                                            required />
                                        <input
                                            type="text"
                                            name="nid"
                                            id="nid"
                                            className='outline-none border w-full rounded py-1 lg:py-2 px-2 text-secondary'
                                            placeholder='Your Nid'
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
                                            className="border-2 border-dashed border-primary p-2 w-full  outline-none rounded py-1 lg:py-2 px-2  flex items-center justify-center cursor-pointer"
                                        >
                                            Upload your photo
                                        </label>
                                    </div>
                                </div>
                                {/* to={'/join/signUpPartOne'} */}
                                
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
                <div>
                    <div className="lg:w-[30vw] h-[350px]  p-5">
                        <img className="lg:w-[30vw] h-[350px]" src={image} alt="" />
                        <div>
                            <p className="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem laboriosam beatae sit et repellat aliquam, labore officiis dolores architecto itaque fugiat est blanditiis hic! Quae quidem tenetur hic mollitia nemo....</p>
                            <p className="mt-5 font-bold">If you agree with these terms and condition then you can register and start traveling with us</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgencyRegister;