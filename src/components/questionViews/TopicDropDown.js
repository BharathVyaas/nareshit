import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopicList, userSelectionAction } from "../../store/root.actions";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function TopicDropDown() {
  const dispatch = useDispatch();
  const userSelection = useSelector((store) => store.userSelectionReducer);
  const topiclist = useSelector((store) => store.topicsListReducer);

  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");

  useEffect(() => {
    if (userSelection.module && userSelection.module.ModuleID)
      dispatch(fetchTopicList(userSelection.module.ModuleID));
    else console.warn("trying to fetch modules without moduleId");
  }, [userSelection.module?.ModuleID]);

  useEffect(() => {
    if (topiclist.data.length > 0) {
      setTopics(topiclist.data);
    }
  }, [topiclist]);

  useEffect(() => {
    if (topics.length > 0) {
      const selectedTopicData = topics.find(
        (ele) => ele.TopicID === selectedTopic
      );
      dispatch(userSelectionAction.setTopic(selectedTopicData));

      if (!selectedTopicData) console.warn("Cannot find topic with topicId");
    }
  }, [selectedTopic]);

  const onSelectionChange = (e) => {
    setSelectedTopic(e.target.value);
  };

  return (
    <div className="min-w-[18rem] max-w-[18rem]">
      <FormControl fullWidth>
        <InputLabel id="demo-select-small-label">Select A Topic</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          label="Select A Topic"
          value={selectedTopic}
          onChange={onSelectionChange}
        >
          {topics.map((topic) => (
            <MenuItem key={topic.TopicID} value={topic.TopicID}>
              {topic.TopicName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default TopicDropDown;
