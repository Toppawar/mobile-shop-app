import { lazy, useCallback, useEffect, useState } from "react";
import {
  SimpleGrid,
  Box,
  Input,
  InputGroup,
  InputRightAddon,
  Spinner,
} from "@chakra-ui/react";

import debounce from "../../utils/debounce";
import { filterArray } from "../../utils/array";

const ListItem = lazy(() => {
  return import("./ListItem");
});

const ListView = ({ data, onClick }) => {
  const [search, setSearch] = useState("");
  const [list, setList] = useState(data);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setList(data);
  }, [data]);

  const filterList = useCallback(
    debounce((value) => {
      setIsSearching(false);
      if (!value) {
        setList(data);
        return;
      }
      setList(filterArray(value, list));
    }, 1000),
    [list, data]
  );

  const handleChange = (e) => {
    const { value } = e.target;
    setIsSearching(true);
    setSearch(value);
    filterList(value);
  };

  return (
    <Box p="3.5">
      <Box mb="3">
        <InputGroup>
          <Input
            value={search}
            placeholder="Search in PlexusPhone"
            onChange={handleChange}
          />
          {isSearching ? (
            <InputRightAddon>
              <Spinner />
            </InputRightAddon>
          ) : null}
        </InputGroup>
      </Box>
      <SimpleGrid minChildWidth="240px" columns={2} spacing="40px">
        {list?.map(({ model, brand, imgUrl, price, id }) => {
          return (
            <Box
              key={`${brand}-${model}`}
              onClick={() => {
                return onClick(id);
              }}
            >
              <ListItem
                key={model}
                model={model}
                brand={brand}
                imgUrl={imgUrl}
                price={price}
              />
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default ListView;
