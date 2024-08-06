export const requestJSON = {
  rightsContexts: [
    {
      guid: '5e084dc7-91ed-4803-b72b-249871f7debf',
      evidences: [
        {
          name: 'Role',
          value: 'Admin',
        },
      ],
    },
  ],
  processingContexts: [
    {
      guid: 'ffc6fc02-17d3-4e5c-95a5-234b35662169',
      evidences: [
        {
          name: 'Action',
          value: 'Protect',
        },
      ],
    },
  ],
  requests: [
    {
      guid: 'b0cf56d2-c330-4890-ac11-307805279c19',
      rightsContext: '5e084dc7-91ed-4803-b72b-249871f7debf',
      processingContext: 'ffc6fc02-17d3-4e5c-95a5-234b35662169',
      instances: [
        {
          className: 'User',
          propertyName: 'FirstName',
          value: 'Jonny',
        },
        {
          value: 'Anonymouse',
        },
      ],
    },
  ],
}

export const requestJSONSharp = {
  RightsContexts: [
    {
      Guid: '5e084dc7-91ed-4803-b72b-249871f7debf',
      Evidences: [
        {
          Name: 'Role',
          Value: 'Admin',
        },
      ],
    },
  ],
  ProcessingContexts: [
    {
      Guid: 'ffc6fc02-17d3-4e5c-95a5-234b35662169',
      Evidences: [
        {
          Name: 'Action',
          Value: 'Protect',
        },
      ],
    },
  ],
  Requests: [
    {
      Guid: 'b0cf56d2-c330-4890-ac11-307805279c19',
      RightsContext: '5e084dc7-91ed-4803-b72b-249871f7debf',
      ProcessingContext: 'ffc6fc02-17d3-4e5c-95a5-234b35662169',
      Instances: [
        {
          ClassName: 'User',
          PropertyName: 'FirstName',
          Value: 'Jonny',
        },
        {
          Value: 'Anonymouse',
        },
      ],
    },
  ],
}

export const transformInput = {
  rightsContexts: [
    {
      guid: '5e084dc7-91ed-4803-b72b-249871f7debf',
      evidences: [
        {
          name: 'Role',
          value: 'Admin',
        },
      ],
    },
  ],
  processingContexts: [
    {
      guid: 'ffc6fc02-17d3-4e5c-95a5-234b35662169',
      evidences: [
        {
          name: 'Action',
          value: 'Protect',
        },
      ],
    },
  ],
  requests: [
    {
      guid: 'b0cf56d2-c330-4890-ac11-307805279c19',
      rightsContext: '5e084dc7-91ed-4803-b72b-249871f7debf',
      processingContext: 'ffc6fc02-17d3-4e5c-95a5-234b35662169',
      instances: [
        {
          className: 'User',
          propertyName: 'FirstName',
          value: 'Jonny',
        },
        {
          className: 'User',
          propertyName: 'LastName',
          value: 'Silverhand',
        },
        {
          className: 'User',
          propertyName: 'BirthDate',
          value: '16.11.1988',
        },
      ],
    },
  ],
}
