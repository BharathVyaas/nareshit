import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSubTopicList,
  userSelectionAction,
} from "../../store/root.actions";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function SubTopicDropDown() {
  const dispatch = useDispatch();
  const userSelection = useSelector((store) => store.userSelectionReducer);
  const subTopiclist = useSelector((store) => store.subTopicsListReducer);

  const [subTopics, setSubTopics] = useState([]);
  const [selectedSubTopic, setSelectedSubTopic] = useState("");

  useEffect(() => {
    if (userSelection.topic && userSelection.topic.TopicID)
      dispatch(fetchSubTopicList(userSelection.topic.TopicID));
    else console.warn("trying to fetch topics without moduleId");
  }, [userSelection.topic?.ModuleID]);

  useEffect(() => {
    if (subTopiclist.data.length > 0) {
      setSubTopics(subTopiclist.data);
    }
  }, [subTopics]);

  useEffect(() => {
    if (subTopics.length > 0) {
      const selectedSubTopicData = subTopics.find(
        (ele) => ele.TopicID === selectedSubTopic
      );
      dispatch(userSelectionAction.setSubTopic(selectedSubTopicData));

      if (!selectedSubTopicData) console.warn("Cannot find topic with topicId");
    }
  }, [selectedSubTopic]);

  const onSelectionChange = (e) => {
    setSelectedSubTopic(e.target.value);
  };
  console.log(subTopics.map((subTopic) => subTopic.SubTopicName));
  return (
    <div className="min-w-[18rem] max-w-[18rem]">
      <FormControl fullWidth>
        <InputLabel id="demo-select-small-label">Select A Topic</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          label="Select A Topic"
          value={selectedSubTopic}
          onChange={onSelectionChange}
        >
          {subTopics.map((subTopic) => (
            <MenuItem key={subTopic.SubTopicID} value={subTopic.SubTopicID}>
              {subTopic.SubTopicName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default SubTopicDropDown;
