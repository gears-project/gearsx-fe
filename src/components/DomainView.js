import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Card, Button, CardHeader, CardBody } from 'reactstrap';
import EntityList from 'components/domain/EntityList';
import Loading from 'components/Loading';
import Error from 'components/Error';
import {
  useParams
} from "react-router-dom";
import { GET_DOMAIN_QUERY } from 'gears-queries';

export default ()=> {
  const { domainId } = useParams();
  const { loading, error, data } = useQuery(GET_DOMAIN_QUERY, {
    variables : {
      id : domainId,
    }
  });

  if (loading) return <Loading />;
  if (error) return <Error />;

  const { domain } = data;

  return (
    <div>
      <Card body>
        <CardHeader>{domain.name}</CardHeader>
        <CardBody>
          <EntityList entities={domain.body.entities} />
        </CardBody>
        <Button>Go somewhere</Button>
      </Card>
    </div>
  );
}

