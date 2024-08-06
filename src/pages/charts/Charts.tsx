import { useLocation } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import Strings from "../../utils/localizations/Strings";
import AreasChart from "./components/AreasChart";
import CreatorsChart from "./components/CreatorsChart";
import WeeksChart from "./components/WeeksChart";
import PreclassifiersChart from "./components/PreclassifiersChart";
import { useEffect, useState } from "react";
import { useGetCardTypesCatalogsMutation } from "../../services/CardTypesService";
import { CardTypesCatalog } from "../../data/cardtypes/cardTypes";
import MethodologiesChart from "./components/MethodologiesChart";
import { Card, Empty } from "antd";
import { getColorForMethodology } from "../../utils/Extensions";
import { useGetMethodologiesChartDataMutation } from "../../services/chartService";
import { Methodology } from "../../data/charts/charts";
interface stateType {
  siteId: string;
  siteName: string;
}

const Charts = () => {
  const { state } = useLocation();
  const { siteId, siteName } = state as stateType;
  const [getMethodologiesCatalog] = useGetCardTypesCatalogsMutation();
  const [getMethodologies] = useGetMethodologiesChartDataMutation();
  const [methodologiesCatalog, setMethodologiesCatalog] = useState<
    CardTypesCatalog[]
  >([]);
  const [methodologies, setMethodologies] = useState<Methodology[]>([]);
  const handleGetMethodologiesCatalog = async () => {
    const [response, response2] = await Promise.all([
      getMethodologiesCatalog().unwrap(),
      getMethodologies(siteId).unwrap(),
    ]);

    setMethodologiesCatalog(response);
    setMethodologies(response2);
  };

  useEffect(() => {
    handleGetMethodologiesCatalog();
  }, []);
  return (
    <>
      <div className="h-full flex flex-col">
        <div className="flex flex-col gap-2 items-center m-3">
          <PageTitle mainText={Strings.chartsOf} subText={siteName} />
        </div>
        <div className="flex-1 overflow-auto">
          {methodologies.length > 0 ? (
            <>
              <div className="mb-2 flex flex-wrap flex-row gap-2">
                <Card
                  title={
                    <div className="mt-2 flex flex-col items-center">
                      <h2 className="text-xl font-semibold text-black">
                        {Strings.anomalies}
                      </h2>
                    </div>
                  }
                  className="w-full mx-auto bg-gray-100 rounded-xl shadow-md"
                >
                  <div className="flex flex-col gap-2">
                    <div className="md:w-full justify-center flex flex-wrap gap-2 w-full">
                      {methodologies.map((m, index) => (
                        <div key={index} className="flex gap-1">
                          <div
                            className="w-5 rounded-lg"
                            style={{
                              background: getColorForMethodology(
                                methodologiesCatalog,
                                m.methodology
                              ),
                            }}
                          />
                          <h1 className="md:text-sm text-xs">
                            {m.methodology}
                          </h1>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <div className="md:flex-1 w-full h-60">
                        <PreclassifiersChart
                          siteId={siteId}
                          methodologiesCatalog={methodologiesCatalog}
                        />
                      </div>
                      <div className="md:w-80 w-full h-60">
                        <MethodologiesChart
                          methodologies={methodologies}
                          methodologiesCatalog={methodologiesCatalog}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="mb-2 flex flex-wrap flex-row gap-2">
                <Card
                  title={
                    <div className="mt-2 flex flex-col items-center">
                      <h2 className="text-xl font-semibold text-black">
                        {Strings.cardAreas}
                      </h2>
                    </div>
                  }
                  className="md:flex-1 w-full mx-auto bg-gray-100 rounded-xl shadow-md"
                >
                  <div className="w-full h-60">
                    <AreasChart siteId={siteId} />
                  </div>
                </Card>
                <Card
                  title={
                    <div className="mt-2 flex flex-col items-center">
                      <h2 className="text-xl font-semibold text-black">
                        {Strings.cardCreators}
                      </h2>
                    </div>
                  }
                  className="md:flex-1 w-full mx-auto bg-gray-100 rounded-xl shadow-md"
                >
                  <div className="w-full h-60">
                    <CreatorsChart siteId={siteId} />
                  </div>
                </Card>
              </div>
              <div className="flex flex-wrap flex-row gap-2">
                <Card
                  title={
                    <div className="mt-2 flex flex-col items-center">
                      <h2 className="text-xl font-semibold text-black">
                        {Strings.tagMonitoring}
                      </h2>
                    </div>
                  }
                  className="md:flex-1 w-full mx-auto bg-gray-100 rounded-xl shadow-md"
                >
                  <div className="w-full h-60">
                    <WeeksChart siteId={siteId} />
                  </div>
                </Card>
              </div>
            </>
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </div>
      </div>
    </>
  );
};

export default Charts;
