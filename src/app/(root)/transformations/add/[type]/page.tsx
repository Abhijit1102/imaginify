import Header from '@/components/shared/Header';
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

const AddTransformationTypePage = async ({ params: { type } }) => {
    const session = await getServerSession(authOptions);
    console.log("session: ", session);
    const user = session?.user;

    // Check if the transformation type exists
    const transformation = transformationTypes[type];
    
    if (!transformation) {
        return <div>Error: Transformation type not found.</div>;
    }

    return (
        <>
            <Header title={transformation.title} 
            subtitle={transformation.subTitle} 
            />
            <section className="mt-10">
                <TransformationForm 
                action="Add"
                userId={user}
                type={transformation.type as TransformationTypeKey}
                creditBalance={user}
                />
            </section>    
        </>
    );
};

export default AddTransformationTypePage;
