import React, { useState, useRef } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Loading from 'components/Loading';
import Error from 'components/Error';
import {
  useParams
} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Editor from "@monaco-editor/react";

const QUERY = gql`
  query getFngroup($id: Uuid!) {
    fngroup(input: { documentId: $id }) {
      id
      name
      body {
        fns {
          id
          name
          description
          lang
          body
        }
      }
    }
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default ()=> {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { fngroupId, fnId } = useParams();
  const classes = useStyles();
  const [isEditorReady, setIsEditorReady] = useState(false);
  const valueGetter = useRef();

  const { loading, error, data } = useQuery(QUERY, {
    variables : {
      id : fngroupId,
    }
  });

  if (loading) return <Loading />;
  if (error) return <Error />;

  function theme() {
    return prefersDarkMode ? 'dark' : 'light';
  }

  function handleEditorDidMount(_valueGetter) {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  }
  const { fngroup } = data;

  return (
    <div className={classes.root}>
    { JSON.stringify(data) }
    <Editor
        height="90vh"
        language="javascript"
        theme={ theme() }
        value={ JSON.stringify(data) }
        editorDidMount={handleEditorDidMount}
      />
    </div>
  );
}





