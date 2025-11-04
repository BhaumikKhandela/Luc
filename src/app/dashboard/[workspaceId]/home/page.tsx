import AnalyticsSection from "@/components/global/analytics/AnalyticsSection";

type Props = {};

const Home = (props: Props) => {

    return (
        <div>
            <h2 className="text-[#BDBDBD] text-4xl">Welcome To Opal</h2>
            <div>
                <div className="mt-5">
                <AnalyticsSection/>
                </div>
            </div>
        </div>
    )
}

export default Home;