import { Link } from "react-router-dom";

function Home() {
    return(
        <div className="fixed fixed top-0 right-0 left-0 w-full flex flex-col justify-center items-center text-base font-medium bg-sky-900 text-white w-full min-h-screen p-6">
            <p className="text-center lg:text-2xl sm:text-sm mb-6 max-w-lg">
            Hi there 👋
            I’m a passionate full-stack JavaScript developer focused on building clean, functional web apps with React, Node.js, and PostgreSQL.
            I enjoy turning ideas into user-friendly digital products and I’m open to collaboration or freelance opportunities.
            Kindly hit the login and simulate the app. Thank you.
            </p>
            <div>
            <Link to="/login" className="bg-white border-2 text-sky-900 rounded-sm px-6 py-2 m-4 font-semibold hover:bg-sky-100 transition">
                Login
            </Link >
            <button className="rounded-sm border-2 border-white px-6 py-2 m-4 font-semibold hover:bg-white hover:text-sky-900 transition">
                Register
            </button>
            </div>
        </div>
    );
    
}

export default Home;