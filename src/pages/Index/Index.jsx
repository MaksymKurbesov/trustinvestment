import { Layout } from "antd";
import { HeroBanner } from "../../components/Hero-Banner/Hero-Banner";
import { Advantage } from "../../components/Advantage/Advantage";
import { Plans } from "../../components/Plans/Plans";
import { AffilateProgram } from "../../components/Affilate-Program/Affilate-Program";
import { ContactUs } from "../../components/Contact-Us/Contact-Us";

const { Content } = Layout;

const Index = () => {
  return (
    <>
      <Layout>
        <Content>
          <HeroBanner />
          <div className={"index-layout"}>
            <Advantage />
            <Plans />
            <AffilateProgram />
            <ContactUs />
          </div>
        </Content>
      </Layout>
    </>
  );
};

export { Index };
