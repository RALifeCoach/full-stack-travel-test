import React, {useState} from "react";
import {Button} from "@material-ui/core";
import EditTrip from "./EditTrip";

interface IProps {
  refreshTrips: () => void;
}

const TripsHeaderButtons = ({refreshTrips}: IProps) => {
  const [newOpen, setNewOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setNewOpen(true)}
        variant="outlined"
      >
        New Trip
      </Button>
      {newOpen && (
        <EditTrip
          trip={{}}
          open={newOpen}
          onClose={() => setNewOpen(false)}
          refreshTrips={refreshTrips}
        />
      )}
    </>
  );
};

export default TripsHeaderButtons;
