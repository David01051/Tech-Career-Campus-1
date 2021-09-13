import React, { useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useSelector, useDispatch } from "react-redux";
import { getSyllabus } from "../../../Redux/actions/SyllabusAction";
import fetcher from "../../../utils/fetcher";
import './syllabus.css'

const SyllabusComponent = () => {
  const syllabus = useSelector((state) => state.syllabus.state);
  const dispatch = useDispatch();
  useEffect(() => {
    fetcher("/api/course")
    .then((data) => {
      dispatch(getSyllabus(data?.data[1]));
    });
  }, []);
  return (
    <>
      <VerticalTimeline>
        <h1>{syllabus?.name}</h1>
        {syllabus?.CourseInformation.map((courseItem) => {
          return (
            <VerticalTimelineElement
              key={courseItem.nameSubject}
              className="vertical-timeline-element--work"
              contentStyle={{
                background: "rgb(57 97 121 / 90%)",
                color: "#fff",
              }}
              contentArrowStyle={{
                borderRight: "7px solid  rgb(57 97 121 / 90%)",
              }}
              date="2011 - present"
              iconStyle={{
                background: "rgb(57 97 121 / 90%)",
                color: "rgba(255, 99, 38, 0.9)",
              }}
            >
              <h2 className="vertical-timeline-element-title">
                {courseItem.nameSubject}
              </h2>
              <h4 className="vertical-timeline-element-subtitle">
                <ul className='vertical-timeline-ul'>
                  {courseItem.topics.map((topic, index) => {
                    return <li key={index}>{topic.subject}</li>;
                  })}
                </ul>
              </h4>
              <p>{courseItem.summery}</p>
              <ul className='vertical-timeline-ul'>
                <h3>Links:</h3>
                {courseItem.links.map((link) => {
                  return (
                    <>
                      <li>
                        {" "}
                        <a href={link.tasks}>Google Drive</a>{" "}
                      </li>
                      <li>
                        {" "}
                        <a href={link.Presentations}>Presentation</a>{" "}
                      </li>
                    </>
                  );
                })}
              </ul>
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
      ;
    </>
  )
};
export default SyllabusComponent;