import { useEffect, useState } from "react";
import { getSearchResults } from "../../../services/getSearchResult";
import Layout from "../../layout/layout";
import CardGroup from "../../molecules/cardGroup/cardGroup";

import "./homeContent.scss";
import { useNavbarContext } from "../../../context/navbarContext";

const HomeContent = () => {
  const [searchData, setSearchData] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { value } = useNavbarContext();

  const fetchData = async () => {
    const response = await getSearchResults();
    if (response.isOk) {
      setSearchData(response.data);
    } else {
      setError(response.error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData()
      .then(() => setIsLoading(false))
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });

    if (error) {
      console.error(error);
    }
  }, []);

  if (isLoading) {
    return <p>Loading....</p>;
  }

  return (
    <Layout>
      <div className="home-container">
        <CardGroup cardsData={searchData} searchQuery={value} />
      </div>
    </Layout>
  );
};

export default HomeContent;
