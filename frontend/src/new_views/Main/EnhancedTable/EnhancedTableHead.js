import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Checkbox from "@material-ui/core/Checkbox";
// TODO: Remove MoreVert reference and replace with <Icon>ArrowSplitVertical</Icon>
import { MoreVert } from "@material-ui/icons";
// import { SortablePane, Pane } from "react-sortable-pane";
import ReactDraggable from "react-draggable";

// React-Beautiful-dnd code
const grid = 4;
const getListStyle = isDraggingOver => ({
  display: "flex",
  padding: grid,
  overflow: "none"
});

// React-Beautiful-dnd code
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  paddingBottom: grid * 2,
  margin: `0 ${grid}px 0 0`,
  display: "inline-block",

  // change background colour if dragging
  // background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const EnhancedTableHead = (props) => {
  const createSortHandler = property => event => {
    props.onRequestSort(event, property);
  };

  const {
    columnData,
    numSelected,
    rowCount,
    onSelectAllClick,
    orderBy,
    order,
    handleResizeColumn,
    handleReorderColumnData
  } = props;

  return (
    <DragDropContext onDragEnd={handleReorderColumnData}>
      <TableHead>
        <TableRow
          component={Droppable}
          droppableId="droppable"
          direction="horizontal"
          style={{ padding: 0 }}
        >
          {(provided, snapshot) => (
            <tr
              key={snapshot.toString()}
              ref={provided.innerRef}
              style={{
                ...getListStyle(snapshot.isDraggingOver),
                padding: 0
              }}
              {...provided.droppableProps}
            >
              {columnData.map((item, index) => (
                <TableCell
                  key={item.id}
                  style={{
                    overflow: "none",
                    width: `${item.width}px`,
                    padding: "0 16px",
                    border: "none"
                  }}
                >
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(snapshot.isDragging, {
                          ...provided.draggableProps.style,
                          display: "inline-block",
                          width: `${item.width}px` || "100px",
                          paddingTop: ".25rem"
                        })}
                      >
                        <TableSortLabel
                          active={orderBy === item.id}
                          direction={order}
                          onClick={createSortHandler(item.id)}
                          style={{
                            width: `${item.width - 25}px`,
                            display: "inline-block",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            color: "#68759C",
                            fontSize: "12px"
                          }}
                        >
                          {item.label}
                        </TableSortLabel>
                        {/* {!snapshot.isDragging && (
                          <ReactDraggable
                            axis="x"
                            defaultClassName="ReactDragHandle"
                            defaultClassNameDragging="ReactDragHandleActive"
                            onStop={(event, data) => {
                              const newWidth = item.width + data.x;
                              return handleResizeColumn(item.id, newWidth);
                            }}
                            position={{
                              x: 0,
                              y: 0
                            }}
                            zIndex={999}
                          >
                            <MoreVert
                              suppressContentEditableWarning={true}
                              contentEditable={true}
                              style={{
                                fontSize: "1rem",
                                verticalAlign: "bottom",
                                paddingTop: "8px"
                              }}
                            />
                          </ReactDraggable>
                        )} */}
                      </div>
                    )}
                  </Draggable>
                </TableCell>
              ))}
              {provided.placeholder}
            </tr>
          )}
        </TableRow>
      </TableHead>
    </DragDropContext>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

export default EnhancedTableHead;
