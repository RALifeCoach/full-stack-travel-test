import React, {useCallback, useEffect} from "react";
import {
  Paper,
  Table,
  TableBody,
  Typography
} from "@material-ui/core";
import Spacer from "../shared/Spacer";
import useFetchGet from "../hooks/useFetchGet";
import {TripDetails} from "General";
import TripsHeader from "./TripsHeader";
import TripsRow from "./TripsRow";
import FlexRow from "../shared/flex-grid/FlexRow";
import TripsHeaderButtons from "./TripsHeaderButtons";
import FetchHandling from "../shared/FetchHandling";

const Trips = () => {
  const [trips, fetchTrips] = useFetchGet();

  useEffect(() => {
    fetchTrips('api/trips');
  }, [fetchTrips]);

  const refreshTrips = useCallback(() => {
    fetchTrips('api/trips');
  }, [fetchTrips]);

  return (
    <>
      <Paper elevation={1} style={{padding: 16, margin: '96px 16px 16px 16px'}}>
        <FlexRow justify="space-between">
          <Typography variant="h2">Trips</Typography>
          <TripsHeaderButtons
            refreshTrips={refreshTrips}
          />
        </FlexRow>
        <Spacer height={16}/>
        <Table size="small">
          <TripsHeader/>
          <TableBody>
            {(trips?.data || []).map((trip: TripDetails) => (
              <TripsRow
                refreshTrips={refreshTrips}
                trip={trip}
                key={trip.id}
              />
            ))}
          </TableBody>
        </Table>
      </Paper>
      <FetchHandling status={trips} title="Loading trips..."/>
    </>
  );
};

export default Trips;
