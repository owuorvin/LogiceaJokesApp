import { Divider, Grid, IconButton, InputBase, Theme} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { ClearOutlined, Search } from "@mui/icons-material";
import React, { useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.common.white,
      padding: "2px 4px",
      marginLeft: 5,
      display: "flex",
      alignItems: "center",
      width: 290,
      border: `1px solid ${theme.palette.grey[300]}`,
      borderRadius: "5px",
      "&:focus-within": {
        border: `1px solid ${theme.palette.grey[600]}`,
      },
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 5,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);

type SearchProps = {
  onSearch: Function;
  setUpdatedData: Function;
  placeholder?: string;
  id?: string;
  searched: string;
  setSearched: Function;
  query: string;
  updatedData:any[];
};

const InlineSearchBar: React.FC<SearchProps> = ({
  onSearch,
  setUpdatedData,
  placeholder,
  id,
  searched,
  query,
  setSearched,
  updatedData
}: SearchProps) => {
  const classes = useStyles();
  //const [query, setQuery] = useState<string>("");
  const handleEnterKeyPress = () => {
    onSearch(query);
  };
  //setRows(updatedData);
  // useKeyPress(handleEnterKeyPress, "Enter");
  const handleChange = (e: any) => {
    e.preventDefault();
    onSearch(e.target.value);
    const filteredRows = updatedData.filter((row: any) => {
      return row.fullName.toLowerCase().includes(query.toLowerCase());
    });
    setUpdatedData(filteredRows);
   console.log("ch",filteredRows);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const filteredRows = updatedData.filter((row: any) => {
      return row.fullName.toLowerCase().includes(query.toLowerCase());
    });
    setUpdatedData(filteredRows);
  };

  const handleClear = () => {
    setUpdatedData(updatedData);
    setSearched("");
    onSearch("");
    onSearch("");
  };

  // delay invocation of onSearch - reasonably - on change
  // const debouncedOnSearchHandler = useMemo(
  //   () => debounce(() => onSearch(query.trim()), 500),
  //   [query],
  // );
  // useEffect(() => {
  //   debouncedOnSearchHandler();
  //   return () => {
  //     debouncedOnSearchHandler.cancel();
  //   };
  // }, [query]);

  return (
    <Grid component="div" className={classes.root}>
      <InputBase
        onChange={handleChange}
        value={query}
        className={classes.input}
        placeholder={placeholder}
        inputProps={{ "aria-label": "Search below", id }}
      />
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        onClick={handleSubmit}
      >
        <Search />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        onClick={handleClear}
      >
        <ClearOutlined />
      </IconButton>
    </Grid>
  );
};

InlineSearchBar.defaultProps = {
  placeholder: "Type to search",
  id: "search-in-me",
};

export default InlineSearchBar;
