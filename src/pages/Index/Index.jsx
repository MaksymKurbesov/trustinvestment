import Layout from "antd/lib/layout";
import { HeroBanner } from "./components/Hero-Banner/HeroBanner";
import { Advantage } from "./components/Advantage/Advantage";
import { Plans } from "./components/Plans/Plans";
import { AffilateProgram } from "./components/Affilate-Program/Affilate-Program";
import { ContactUs } from "./components/Contact-Us/Contact-Us";
import { Roadmap } from "./components/Roadmap/Roadmap";
import News from "./components/News/News";

const { Content } = Layout;

const Index = () => {
  return (
    <>
      <News />
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
