import Layout from "../../components/layout/Layout";
import NotifiList from "../../components/specific/Notification/NotifiList";
import { NotifiData } from "../../data/NotifiData";

const Notification = () => {
    return (
        <Layout>
            <NotifiList
                data={NotifiData}
                fields={['id', 'title', 'timeSend', 'timeSend', 'message', 'isChecked']}
            />
        </Layout>
    );
};

export default Notification;