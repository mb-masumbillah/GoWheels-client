import { Link, useLocation, useNavigate } from "react-router-dom";
import { locationData } from "../../../public/locationData";
import { useState } from "react";
// import background from '../../../public/asset/background.jpg'
import image from '../../../public/asset/agency-image2.jpg'
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { generateAgencyId } from "../../components/agencyIdGenerator";

const AgencyInfo = () => {
    const [agencyId, setAgencyId] = useState(1);

    const [selectedDivision, setSelectedDivision] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [districts, setDistricts] = useState([]);
    const [upazillas, setUpazillas] = useState([]);
    const location = useLocation()
    const agencyEmail = location.state?.email;
    // console.log(agencyEmail)
    const navigate = useNavigate();

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

    // let agencyId = 1;
    const handleAgency = async (e) => {
        e.preventDefault()
        const form = e.target;
        const agencyName = form.name.value;
        const transportLicenseNumber = form.transportNumber.value;
        const insuranceLicenseNumber = form.insuranceLicenceNumber.value;
        const numberOfVehicles = parseInt(form.numberOfVehicles.value);
        const division = form.division.value;
        const district = form.district.value;
        const upazilla = form.upazilla.value;
        const area = form.localAddress.value;
        const businessRegNumber = form.regNumber.value;
        const taxIdentificationNumber = form.identificationNumber.value;
        const agency_id = generateAgencyId();
        setAgencyId(agencyId + 1);

        const agencyAddress = {
            division,
            district,
            upazilla,
            area
        }
        const info = {
            agencyName, agencyEmail, agencyAddress, businessRegNumber,
            taxIdentificationNumber,
            transportLicenseNumber,
            insuranceLicenseNumber,
            numberOfVehicles, agency_id
        };

        console.log(info)
        try {
            await mutateAsync(info)


        }
        catch (err) {
            console.log(err)
        }


    }


    const { mutateAsync } = useMutation({
        mutationFn: async (agencyData) => {
            const { data } = await axios.post(`https://go-wheels-server.vercel.app/api/agencyRoute/agencyInfo`, agencyData)
            return data
        },
        onSuccess: () => {
            console.log('data saved successfully')
            navigate('/dashboard/agency/add-vehicle-info', { state: { agencyEmail } });
            // toast.success(' data added successfully')


        }

    })


    // style={{ backgroundImage: `url(${background})` }}

    return (
        <div>
            <h1 className='text-3xl lg:text-3xl text-center mt-10 font-bold  font-merriweather mb-10'>Agency Information</h1>
            <div className="h-[89vh] flex flex-col-reverse lg:flex-row gap-44 justify-center bg-center bg-cover bg-no-repeat pt-10">
                <div className='lg:w-[30vw]  bg-transparent   px-10 rounded-lg'>
                    <div className='text-center mx-auto '>
                    </div>
                    <div className='text-center mx-auto pt-5' >
                        <h1 className="text-xl lg:text-xl font-bold  font-merriweather lg:mt-0 mt-16 mb-10">Enter Information here</h1>
                    </div>
                    <section className='mt-3'>
                        <form
                            onSubmit={handleAgency}
                            className='font-nunito'>
                            <div className='flex gap-5'>
                                <input
                                    type="text"
                                    name="name"
                                    id="firstName"
                                    className='outline-none border w-full rounded py-1 lg:py-2 px-2 text-secondary'
                                    placeholder='Agency Name'
                                    required />
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    readOnly
                                    className='outline-none border placeholder-gray-900  w-full rounded py-1 lg:py-2 px-2 text-primary'
                                    placeholder={agencyEmail}
                                    required />
                            </div>

                            <div className='mt-3 relative space-y-3'>

                                <div className='flex gap-5'>
                                    <input
                                        type="text"
                                        name="insuranceLicenceNumber"
                                        id="insuranceLicenceNumber"
                                        className='outline-none border w-full rounded py-1 lg:py-2 px-2 text-secondary'
                                        placeholder='Insurance Licence Number'
                                        onInput={(e) => e.target.value = e.target.value.toUpperCase()}
                                        required />
                                    <input
                                        type="text"
                                        name="regNumber"
                                        id="regNumber"
                                        className='outline-none border w-full rounded py-1 lg:py-2 px-2 text-secondary'
                                        placeholder='Business Reg Number'
                                        onInput={(e) => e.target.value = e.target.value.toUpperCase()}
                                        required />
                                </div>
                                <div className='flex gap-5'>
                                    <input
                                        type="text"
                                        name="identificationNumber"
                                        id="identificationNumber"
                                        className='outline-none border w-full rounded py-1 lg:py-2 px-2 text-secondary'
                                        placeholder='Tax Identification Number'
                                        onInput={(e) => e.target.value = e.target.value.toUpperCase()}
                                        required />

                                    <input
                                        type="text"
                                        name="transportNumber"
                                        id="transportNumber"
                                        className='outline-none border w-full rounded py-1 lg:py-2 px-2 text-secondary'
                                        placeholder='Transport Lincence Number'
                                        onInput={(e) => e.target.value = e.target.value.toUpperCase()}
                                        required />
                                </div>
                                <input
                                    type="number"
                                    name="numberOfVehicles"
                                    id="numberOfVehicles"
                                    className='outline-none border w-full rounded py-1 lg:py-2 px-2 text-secondary'
                                    placeholder='Number of vehicles'
                                    
                                    required />
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
                            </div>
                            <div className='pb-10 mt-5 flex justify-between'>
                                <Link to={'/join/agencyRegister'}>
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
                <div className="lg:w-[30vw] h-[350px]  p-5">
                    <img className="lg:w-[30vw] h-[350px]" src={image} alt="" />
                    <div>
                        <p className="mt-3 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem laboriosam beatae sit et repellat aliquam, labore officiis dolores architecto itaque fugiat est blanditiis hic! Quae quidem tenetur hic mollitia nemo....</p>
                        <p className="mt-5 font-bold">If you agree with these terms and condition then you can register and start traveling with us</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgencyInfo;