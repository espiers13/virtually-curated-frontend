import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { retrieveSingleVaObject } from "../api/api";
import { retrieveSingleArticObject } from "../api/api";
import ItemPageCardVA from "../components/ItemPageCardVA";
import ItemPageCardArtic from "../components/ItemPageCardArtic";
import Loading from "../components/Loading";

function ItemPage({ currentUser }) {
  const { api, item_id } = useParams();
  const [currentItem, setCurrentItem] = useState({});
  const [currentItemImages, setCurrentItemImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentItemTitle, setCurrentItemTitle] = useState([]);

  if (api === "va") {
    useEffect(() => {
      setIsLoading(true);
      retrieveSingleVaObject(item_id).then((data) => {
        const {
          objectType,
          artistMakerOrganisations,
          artistMakerPeople,
          artistMakerPerson,
          productionDates,
          summaryDescription,
          objectHistory,
          physicalDescription,
          briefDescription,
          materialsAndTechniques,
        } = data.record;

        setCurrentItem({
          objectType: objectType,
          artistMakerOrganisations: artistMakerOrganisations[0],
          artistMakerPeople: artistMakerPeople[0],
          artistMakerPerson: artistMakerPerson[0],
          productionDates: productionDates[0].date.text,
          summaryDescription,
          objectHistory,
          physicalDescription,
          briefDescription,
          materialsAndTechniques,
        });
        const images = [];
        data.record.images.forEach((image) =>
          images.push(
            `https://framemark.vam.ac.uk/collections/${image}/full/220,/0/default.jpg`
          )
        );
        setCurrentItemImages(images);
        setCurrentItemTitle(data.record.titles);
        setIsLoading(false);
      });
    }, []);
  }

  if (api === "artic") {
    useEffect(() => {
      setIsLoading(true);
      retrieveSingleArticObject(item_id).then((data) => {
        setCurrentItem(data.data);
        setIsLoading(false);
      });
    }, []);
  }

  if (isLoading) {
    return <Loading />;
  }

  if (api === "va") {
    return (
      <main className="">
        <ItemPageCardVA
          currentItem={currentItem}
          item_id={item_id}
          currentItemImages={currentItemImages}
          currentItemTitle={currentItemTitle}
          currentUser={currentUser}
        />
      </main>
    );
  }

  if (api === "artic") {
    return (
      <main className="">
        <ItemPageCardArtic
          currentItem={currentItem}
          item_id={item_id}
          currentItemImages={currentItemImages}
          currentItemTitle={currentItemTitle}
          currentUser={currentUser}
        />
      </main>
    );
  }
}

export default ItemPage;
