import Layout from "antd/lib/layout";
import { HeroBanner } from "./components/Hero-Banner/HeroBanner";
import { Advantage } from "./components/Advantage";
import { Plans } from "./components/Plans/Plans";
import { AffilateProgram } from "./components/Affilate-Program";
import { ContactUs } from "./components/Contact-Us/Contact-Us";
import { Roadmap } from "./components/Roadmap";

const { Content } = Layout;

const Index = () => {
  return (
    <>
      <Layout>
        <HeroBanner />
        <Content>
          <div className={"index-layout"}>
            <Advantage />
            <Plans />
            <div className={"affilate-roadmap-wrapper"}>
              <Roadmap />
              <AffilateProgram />
            </div>
            <ContactUs />
          </div>
        </Content>
      </Layout>
    </>
  );
};

export { Index };
