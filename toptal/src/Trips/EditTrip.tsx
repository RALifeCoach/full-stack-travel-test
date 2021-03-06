import React, { useCallback, useEffect, useReducer } from "react";
import { IAction, TripDetails } from "General";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography
} from "@material-ui/core";
import FlexColumn from "../shared/flex-grid/FlexColumn";
import FlexRow from "../shared/flex-grid/FlexRow";
import UpdateHandling from "../shared/UpdateHandling";
import useFetchSave from "../hooks/useFetchSave";
import moment from "moment";
import EditFieldDestination from "./EditFieldDestination";
import EditFieldStartDate from "./EditFieldStartDate";
import EditFieldEndDate from "./EditFieldEndDate";
import EditFieldComments from "./EditFieldComments";

interface IProps {
  trip: TripDetails;
  open: boolean;
  onClose: () => void;
  refreshTrips: () => void;
}

interface IEditTripState extends TripDetails {
  destinationError: string;
  startDateError: string;
  endDateError: string;
}

const EditTrip = ({ trip, open, onClose, refreshTrips }: IProps) => {
  const [state, dispatch] = useReducer((state: IEditTripState, action: IAction) => {
    return { ...state, [action.type]: action.value };
  }, {
    ...trip,
    startDate: trip?.startDate ? trip.startDate.substr(0, 10) : '',
    endDate: trip?.endDate ? trip.endDate.substr(0, 10) : '',
    destinationError: '',
    startDateError: '',
    endDateError: ''
  });

  const { id, destination, destinationError, startDate, startDateError, endDate, endDateError, comments } = state;

  useEffect(() => {
    if (!endDate || !startDate) {
      dispatch({ type: 'endDateError', value: '' });
      return;
    }
    const start = moment(startDate);
    const end = moment(endDate);
    const diff = end.diff(start, "days");
    dispatch({ type: 'endDateError', value: diff < 0 ? 'End < Start' : '' });
  }, [dispatch, startDate, endDate]);

  const [status, performUpdate] = useFetchSave();
  const handleUpdate = useCallback((state) => {
    const { id, destination, destinationError, startDate, startDateError, endDate, endDateError, comments } = state;
    if (destinationError || startDateError || endDateError) {
      return;
    }
    const body = {
      destination,
      startDate,
      endDate: endDate || null,
      comments: comments || null,
    } as TripDetails;
    if (id) {
      body.id = id;
    }
    performUpdate(body, 'api/trips/update/');
  }, [performUpdate]);

  useEffect(() => {
    if (status.status) {
      refreshTrips();
      onClose();
    }
  }, [status, onClose, refreshTrips]);

  const width = 350;
  const height = 600;
  return (
    <>
      <Dialog
        open={open}
        disableBackdropClick
        disableEscapeKeyDown
        PaperProps={{
          style: {
            width,
            height,
            maxWidth: width,
            maxHeight: height,
            minWidth: width,
            minHeight: height,
          },
        }}
        onClose={onClose}
      >
        <DialogTitle>
          <Typography variant="h2">
            {Boolean(id) ? 'Edit Trip' : 'Add Trip'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <FlexColumn>
            <Divider style={{ width: '100%' }} />
            <EditFieldDestination
              error={destinationError}
              value={destination || ""}
              dispatch={dispatch}
            />
            <EditFieldStartDate
              error={startDateError}
              value={startDate || ""}
              dispatch={dispatch}
            />
            <EditFieldEndDate
              error={endDateError}
              value={endDate || ""}
              dispatch={dispatch}
            />
            <EditFieldComments
              value={comments || ""}
              dispatch={dispatch}
            />
          </FlexColumn>
        </DialogContent>
        <DialogActions>
          <FlexRow justify="flex-end">
            <Button
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleUpdate(state)}
            >
              Save
            </Button>
          </FlexRow>
        </DialogActions>
      </Dialog>
      <UpdateHandling status={status} title="Updating Travel..." />
    </>
  );
};

export default EditTrip;
