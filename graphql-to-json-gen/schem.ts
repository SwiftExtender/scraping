export const schema = `"""The root query type which gives access points into the data universe."""
type Query implements Node {
  """
  Exposes the root query type nested one level down. This is helpful for Relay 1
  which can only query top level fields if they are in a particular form.
  """
  query: Query!

  """
  The root query type must be a Node to work well with Relay 1 mutations. This just resolves to query.
  """
  nodeId: ID!

  """Fetches an object given its globally unique ID."""
  node(
    """The globally unique ID."""
    nodeId: ID!
  ): Node

  """Reads and enables pagination through a set of _PrismaMigration."""
  allPrismaMigrations(
    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """The method to use when ordering _PrismaMigration."""
    orderBy: [_PrismaMigrationsOrderBy!] = [PRIMARY_KEY_ASC]

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: _PrismaMigrationCondition
  ): _PrismaMigrationsConnection

  """Reads and enables pagination through a set of Agent."""
  allAgents(
    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """The method to use when ordering Agent."""
    orderBy: [AgentsOrderBy!] = [PRIMARY_KEY_ASC]

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: AgentCondition
  ): AgentsConnection

  """Reads and enables pagination through a set of Domain."""
  allDomains(
    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """The method to use when ordering Domain."""
    orderBy: [DomainsOrderBy!] = [PRIMARY_KEY_ASC]

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: DomainCondition
  ): DomainsConnection

  """Reads and enables pagination through a set of DomainsHost."""
  allDomainsHosts(
    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """The method to use when ordering DomainsHost."""
    orderBy: [DomainsHostsOrderBy!] = [PRIMARY_KEY_ASC]

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: DomainsHostCondition
  ): DomainsHostsConnection

  """Reads and enables pagination through a set of Extractor."""
  allExtractors(
    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """The method to use when ordering Extractor."""
    orderBy: [ExtractorsOrderBy!] = [PRIMARY_KEY_ASC]

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: ExtractorCondition
  ): ExtractorsConnection

  """Reads and enables pagination through a set of Host."""
  allHosts(
    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """The method to use when ordering Host."""
    orderBy: [HostsOrderBy!] = [PRIMARY_KEY_ASC]

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: HostCondition
  ): HostsConnection

  """Reads and enables pagination through a set of Keyword."""
  allKeywords(
    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """The method to use when ordering Keyword."""
    orderBy: [KeywordsOrderBy!] = [PRIMARY_KEY_ASC]

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: KeywordCondition
  ): KeywordsConnection

  """Reads and enables pagination through a set of Param."""
  allParams(
    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """The method to use when ordering Param."""
    orderBy: [ParamsOrderBy!] = [PRIMARY_KEY_ASC]

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: ParamCondition
  ): ParamsConnection

  """Reads and enables pagination through a set of Port."""
  allPorts(
    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """The method to use when ordering Port."""
    orderBy: [PortsOrderBy!] = [PRIMARY_KEY_ASC]

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: PortCondition
  ): PortsConnection

  """Reads and enables pagination through a set of Request."""
  allRequests(
    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """The method to use when ordering Request."""
    orderBy: [RequestsOrderBy!] = [PRIMARY_KEY_ASC]

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: RequestCondition
  ): RequestsConnection

  """Reads and enables pagination through a set of Scan."""
  allScans(
    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """The method to use when ordering Scan."""
    orderBy: [ScansOrderBy!] = [PRIMARY_KEY_ASC]

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: ScanCondition
  ): ScansConnection

  """Reads and enables pagination through a set of Subnet."""
  allSubnets(
    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """The method to use when ordering Subnet."""
    orderBy: [SubnetsOrderBy!] = [PRIMARY_KEY_ASC]

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: SubnetCondition
  ): SubnetsConnection

  """Reads and enables pagination through a set of Tool."""
  allTools(
    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """The method to use when ordering Tool."""
    orderBy: [ToolsOrderBy!] = [PRIMARY_KEY_ASC]

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: ToolCondition
  ): ToolsConnection

  """Reads and enables pagination through a set of Url."""
  allUrls(
    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """The method to use when ordering Url."""
    orderBy: [UrlsOrderBy!] = [PRIMARY_KEY_ASC]

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: UrlCondition
  ): UrlsConnection

  """Reads and enables pagination through a set of VhostPort."""
  allVhostPorts(
    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """The method to use when ordering VhostPort."""
    orderBy: [VhostPortsOrderBy!] = [PRIMARY_KEY_ASC]

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: VhostPortCondition
  ): VhostPortsConnection

  """Reads and enables pagination through a set of Vhost."""
  allVhosts(
    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """The method to use when ordering Vhost."""
    orderBy: [VhostsOrderBy!] = [PRIMARY_KEY_ASC]

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: VhostCondition
  ): VhostsConnection
  _prismaMigrationById(id: String!): _PrismaMigration
  agentById(id: Int!): Agent
  domainById(id: Int!): Domain
  domainsHostByDomainIdAndHostId(domainId: Int!, hostId: Int!): DomainsHost
  extractorById(id: Int!): Extractor
  hostById(id: Int!): Host
  keywordById(id: Int!): Keyword
  paramById(id: Int!): Param
  portById(id: Int!): Port
  requestById(id: Int!): Request
  scanById(id: Int!): Scan
  subnetById(id: Int!): Subnet
  toolById(id: Int!): Tool
  urlById(id: Int!): Url
  vhostPortByVhostIdAndPortId(vhostId: Int!, portId: Int!): VhostPort
  vhostById(id: Int!): Vhost

  """Reads a single _PrismaMigration using its globally unique ID."""
  _prismaMigration(
    """
    The globally unique ID to be used in selecting a single _PrismaMigration.
    """
    nodeId: ID!
  ): _PrismaMigration

  """Reads a single Agent using its globally unique ID."""
  agent(
    """The globally unique ID to be used in selecting a single Agent."""
    nodeId: ID!
  ): Agent

  """Reads a single Domain using its globally unique ID."""
  domain(
    """The globally unique ID to be used in selecting a single Domain."""
    nodeId: ID!
  ): Domain

  """Reads a single DomainsHost using its globally unique ID."""
  domainsHost(
    """
    The globally unique ID to be used in selecting a single DomainsHost.
    """
    nodeId: ID!
  ): DomainsHost

  """Reads a single Extractor using its globally unique ID."""
  extractor(
    """The globally unique ID to be used in selecting a single Extractor."""
    nodeId: ID!
  ): Extractor

  """Reads a single Host using its globally unique ID."""
  host(
    """The globally unique ID to be used in selecting a single Host."""
    nodeId: ID!
  ): Host

  """Reads a single Keyword using its globally unique ID."""
  keyword(
    """The globally unique ID to be used in selecting a single Keyword."""
    nodeId: ID!
  ): Keyword

  """Reads a single Param using its globally unique ID."""
  param(
    """The globally unique ID to be used in selecting a single Param."""
    nodeId: ID!
  ): Param

  """Reads a single Port using its globally unique ID."""
  port(
    """The globally unique ID to be used in selecting a single Port."""
    nodeId: ID!
  ): Port

  """Reads a single Request using its globally unique ID."""
  request(
    """The globally unique ID to be used in selecting a single Request."""
    nodeId: ID!
  ): Request

  """Reads a single Scan using its globally unique ID."""
  scan(
    """The globally unique ID to be used in selecting a single Scan."""
    nodeId: ID!
  ): Scan

  """Reads a single Subnet using its globally unique ID."""
  subnet(
    """The globally unique ID to be used in selecting a single Subnet."""
    nodeId: ID!
  ): Subnet

  """Reads a single Tool using its globally unique ID."""
  tool(
    """The globally unique ID to be used in selecting a single Tool."""
    nodeId: ID!
  ): Tool

  """Reads a single Url using its globally unique ID."""
  url(
    """The globally unique ID to be used in selecting a single Url."""
    nodeId: ID!
  ): Url

  """Reads a single VhostPort using its globally unique ID."""
  vhostPort(
    """The globally unique ID to be used in selecting a single VhostPort."""
    nodeId: ID!
  ): VhostPort

  """Reads a single Vhost using its globally unique ID."""
  vhost(
    """The globally unique ID to be used in selecting a single Vhost."""
    nodeId: ID!
  ): Vhost
}

"""An object with a globally unique ID."""
interface Node {
  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!
}

"""A connection to a list of _PrismaMigration values."""
type _PrismaMigrationsConnection {
  """A list of _PrismaMigration objects."""
  nodes: [_PrismaMigration]!

  """
  A list of edges which contains the _PrismaMigration and cursor to aid in pagination.
  """
  edges: [_PrismaMigrationsEdge!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """
  The count of *all* _PrismaMigration you could get from the connection.
  """
  totalCount: Int!
}

type _PrismaMigration implements Node {
  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!
  id: String!
  checksum: String!
  finishedAt: Datetime
  migrationName: String!
  logs: String
  rolledBackAt: Datetime
  startedAt: Datetime!
  appliedStepsCount: Int!
}

"""
A point in time as described by the [ISO
8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
"""
scalar Datetime

"""A _PrismaMigration edge in the connection."""
type _PrismaMigrationsEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The _PrismaMigration at the end of the edge."""
  node: _PrismaMigration
}

"""A location in a connection that can be used for resuming pagination."""
scalar Cursor

"""Information about pagination in a connection."""
type PageInfo {
  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: Cursor

  """When paginating forwards, the cursor to continue."""
  endCursor: Cursor
}

"""Methods to use when ordering _PrismaMigration."""
enum _PrismaMigrationsOrderBy {
  NATURAL
  ID_ASC
  ID_DESC
  CHECKSUM_ASC
  CHECKSUM_DESC
  FINISHED_AT_ASC
  FINISHED_AT_DESC
  MIGRATION_NAME_ASC
  MIGRATION_NAME_DESC
  LOGS_ASC
  LOGS_DESC
  ROLLED_BACK_AT_ASC
  ROLLED_BACK_AT_DESC
  STARTED_AT_ASC
  STARTED_AT_DESC
  APPLIED_STEPS_COUNT_ASC
  APPLIED_STEPS_COUNT_DESC
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
}

"""
A condition to be used against _PrismaMigration object types. All fields are
tested for equality and combined with a logical ‘and.’
"""
input _PrismaMigrationCondition {
  """Checks for equality with the object’s id field."""
  id: String

  """Checks for equality with the object’s checksum field."""
  checksum: String

  """Checks for equality with the object’s finishedAt field."""
  finishedAt: Datetime

  """Checks for equality with the object’s migrationName field."""
  migrationName: String

  """Checks for equality with the object’s logs field."""
  logs: String

  """Checks for equality with the object’s rolledBackAt field."""
  rolledBackAt: Datetime

  """Checks for equality with the object’s startedAt field."""
  startedAt: Datetime

  """Checks for equality with the object’s appliedStepsCount field."""
  appliedStepsCount: Int
}

"""A connection to a list of Agent values."""
type AgentsConnection {
  """A list of Agent objects."""
  nodes: [Agent]!

  """
  A list of edges which contains the Agent and cursor to aid in pagination.
  """
  edges: [AgentsEdge!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* Agent you could get from the connection."""
  totalCount: Int!
}

type Agent implements Node {
  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!
  id: Int!
  name: String!
  description: String
  url: String!
  token: String!
  status: String!

  """Reads and enables pagination through a set of Scan."""
  scansByAgentId(
    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """The method to use when ordering Scan."""
    orderBy: [ScansOrderBy!] = [PRIMARY_KEY_ASC]

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: ScanCondition
  ): ScansConnection!
}

"""A connection to a list of Scan values."""
type ScansConnection {
  """A list of Scan objects."""
  nodes: [Scan]!

  """
  A list of edges which contains the Scan and cursor to aid in pagination.
  """
  edges: [ScansEdge!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* Scan you could get from the connection."""
  totalCount: Int!
}

type Scan implements Node {
  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!
  id: Int!
  startTime: Datetime!
  endTime: Datetime
  status: String
  stdout: String
  stderr: String
  description: String
  agentId: Int
  toolId: Int

  """Reads a single Agent that is related to this Scan."""
  agentByAgentId: Agent

  """Reads a single Tool that is related to this Scan."""
  toolByToolId: Tool
}

type Tool implements Node {
  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!
  id: Int!
  name: String!
  description: String
  command: String!

  """Reads and enables pagination through a set of Scan."""
  scansByToolId(
    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """The method to use when ordering Scan."""
    orderBy: [ScansOrderBy!] = [PRIMARY_KEY_ASC]

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: ScanCondition
  ): ScansConnection!
}

"""Methods to use when ordering Scan."""
enum ScansOrderBy {
  NATURAL
  ID_ASC
  ID_DESC
  START_TIME_ASC
  START_TIME_DESC
  END_TIME_ASC
  END_TIME_DESC
  STATUS_ASC
  STATUS_DESC
  STDOUT_ASC
  STDOUT_DESC
  STDERR_ASC
  STDERR_DESC
  DESCRIPTION_ASC
  DESCRIPTION_DESC
  AGENT_ID_ASC
  AGENT_ID_DESC
  TOOL_ID_ASC
  TOOL_ID_DESC
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
}

"""
A condition to be used against Scan object types. All fields are tested for equality and combined with a logical ‘and.’
"""
input ScanCondition {
  """Checks for equality with the object’s id field."""
  id: Int

  """Checks for equality with the object’s startTime field."""
  startTime: Datetime

  """Checks for equality with the object’s endTime field."""
  endTime: Datetime

  """Checks for equality with the object’s status field."""
  status: String

  """Checks for equality with the object’s stdout field."""
  stdout: String

  """Checks for equality with the object’s stderr field."""
  stderr: String

  """Checks for equality with the object’s description field."""
  description: String

  """Checks for equality with the object’s agentId field."""
  agentId: Int

  """Checks for equality with the object’s toolId field."""
  toolId: Int
}

"""A Scan edge in the connection."""
type ScansEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The Scan at the end of the edge."""
  node: Scan
}

"""A Agent edge in the connection."""
type AgentsEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The Agent at the end of the edge."""
  node: Agent
}

"""Methods to use when ordering Agent."""
enum AgentsOrderBy {
  NATURAL
  ID_ASC
  ID_DESC
  NAME_ASC
  NAME_DESC
  DESCRIPTION_ASC
  DESCRIPTION_DESC
  URL_ASC
  URL_DESC
  TOKEN_ASC
  TOKEN_DESC
  STATUS_ASC
  STATUS_DESC
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
}

"""
A condition to be used against Agent object types. All fields are tested for equality and combined with a logical ‘and.’
"""
input AgentCondition {
  """Checks for equality with the object’s id field."""
  id: Int

  """Checks for equality with the object’s name field."""
  name: String

  """Checks for equality with the object’s description field."""
  description: String

  """Checks for equality with the object’s url field."""
  url: String

  """Checks for equality with the object’s token field."""
  token: String

  """Checks for equality with the object’s status field."""
  status: String
}

"""A connection to a list of Domain values."""
type DomainsConnection {
  """A list of Domain objects."""
  nodes: [Domain]!

  """
  A list of edges which contains the Domain and cursor to aid in pagination.
  """
  edges: [DomainsEdge!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* Domain you could get from the connection."""
  totalCount: Int!
}

type Domain implements Node {
  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!
  id: Int!
  name: String!
  info: String

  """Reads and enables pagination through a set of DomainsHost."""
  domainsHostsByDomainId(
    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """The method to use when ordering DomainsHost."""
    orderBy: [DomainsHostsOrderBy!] = [PRIMARY_KEY_ASC]

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: DomainsHostCondition
  ): DomainsHostsConnection!
}

"""A connection to a list of DomainsHost values."""
type DomainsHostsConnection {
  """A list of DomainsHost objects."""
  nodes: [DomainsHost]!

  """
  A list of edges which contains the DomainsHost and cursor to aid in pagination.
  """
  edges: [DomainsHostsEdge!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* DomainsHost you could get from the connection."""
  totalCount: Int!
}

type DomainsHost implements Node {
  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!
  domainId: Int!
  hostId: Int!

  """Reads a single Domain that is related to this DomainsHost."""
  domainByDomainId: Domain

  """Reads a single Host that is related to this DomainsHost."""
  hostByHostId: Host
}

type Host implements Node {
  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!
  id: Int!
  ip: String!
  info: String
  subnetId: Int

  """Reads a single Subnet that is related to this Host."""
  subnetBySubnetId: Subnet

  """Reads and enables pagination through a set of DomainsHost."""
  domainsHostsByHostId(
    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """The method to use when ordering DomainsHost."""
    orderBy: [DomainsHostsOrderBy!] = [PRIMARY_KEY_ASC]

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: DomainsHostCondition
  ): DomainsHostsConnection!

  """Reads and enables pagination through a set of Port."""
  portsByHostId(
    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """The method to use when ordering Port."""
    orderBy: [PortsOrderBy!] = [PRIMARY_KEY_ASC]

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: PortCondition
  ): PortsConnection!
}

type Subnet implements Node {
  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!
  id: Int!
  cidr: String!
  name: String
  description: String

  """Reads and enables pagination through a set of Host."""
  hostsBySubnetId(
    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """The method to use when ordering Host."""
    orderBy: [HostsOrderBy!] = [PRIMARY_KEY_ASC]

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: HostCondition
  ): HostsConnection!
}

"""A connection to a list of Host values."""
type HostsConnection {
  """A list of Host objects."""
  nodes: [Host]!

  """
  A list of edges which contains the Host and cursor to aid in pagination.
  """
  edges: [HostsEdge!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* Host you could get from the connection."""
  totalCount: Int!
}

"""A Host edge in the connection."""
type HostsEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The Host at the end of the edge."""
  node: Host
}

"""Methods to use when ordering Host."""
enum HostsOrderBy {
  NATURAL
  ID_ASC
  ID_DESC
  IP_ASC
  IP_DESC
  INFO_ASC
  INFO_DESC
  SUBNET_ID_ASC
  SUBNET_ID_DESC
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
}

"""
A condition to be used against Host object types. All fields are tested for equality and combined with a logical ‘and.’
"""
input HostCondition {
  """Checks for equality with the object’s id field."""
  id: Int

  """Checks for equality with the object’s ip field."""
  ip: String

  """Checks for equality with the object’s info field."""
  info: String

  """Checks for equality with the object’s subnetId field."""
  subnetId: Int
}

"""Methods to use when ordering DomainsHost."""
enum DomainsHostsOrderBy {
  NATURAL
  DOMAIN_ID_ASC
  DOMAIN_ID_DESC
  HOST_ID_ASC
  HOST_ID_DESC
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
}

"""
A condition to be used against DomainsHost object types. All fields are tested
for equality and combined with a logical ‘and.’
"""
input DomainsHostCondition {
  """Checks for equality with the object’s domainId field."""
  domainId: Int

  """Checks for equality with the object’s hostId field."""
  hostId: Int
}

"""A connection to a list of Port values."""
type PortsConnection {
  """A list of Port objects."""
  nodes: [Port]!

  """
  A list of edges which contains the Port and cursor to aid in pagination.
  """
  edges: [PortsEdge!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* Port you could get from the connection."""
  totalCount: Int!
}

type Port implements Node {
  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!
  id: Int!
  number: Int!
  hostId: Int!
  info: String
  protocol: String!

  """Reads a single Host that is related to this Port."""
  hostByHostId: Host

  """Reads and enables pagination through a set of VhostPort."""
  vhostPortsByPortId(
    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """The method to use when ordering VhostPort."""
    orderBy: [VhostPortsOrderBy!] = [PRIMARY_KEY_ASC]

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: VhostPortCondition
  ): VhostPortsConnection!
}

"""A connection to a list of VhostPort values."""
type VhostPortsConnection {
  """A list of VhostPort objects."""
  nodes: [VhostPort]!

  """
  A list of edges which contains the VhostPort and cursor to aid in pagination.
  """
  edges: [VhostPortsEdge!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* VhostPort you could get from the connection."""
  totalCount: Int!
}

type VhostPort implements Node {
  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!
  vhostId: Int!
  portId: Int!

  """Reads a single Vhost that is related to this VhostPort."""
  vhostByVhostId: Vhost

  """Reads a single Port that is related to this VhostPort."""
  portByPortId: Port
}

type Vhost implements Node {
  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!
  id: Int!
  name: String!
  info: String

  """Reads and enables pagination through a set of Param."""
  paramsByVhostId(
    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """The method to use when ordering Param."""
    orderBy: [ParamsOrderBy!] = [PRIMARY_KEY_ASC]

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: ParamCondition
  ): ParamsConnection!

  """Reads and enables pagination through a set of Url."""
  urlsByVhostId(
    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """The method to use when ordering Url."""
    orderBy: [UrlsOrderBy!] = [PRIMARY_KEY_ASC]

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: UrlCondition
  ): UrlsConnection!

  """Reads and enables pagination through a set of VhostPort."""
  vhostPortsByVhostId(
    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """The method to use when ordering VhostPort."""
    orderBy: [VhostPortsOrderBy!] = [PRIMARY_KEY_ASC]

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: VhostPortCondition
  ): VhostPortsConnection!
}

"""A connection to a list of Param values."""
type ParamsConnection {
  """A list of Param objects."""
  nodes: [Param]!

  """
  A list of edges which contains the Param and cursor to aid in pagination.
  """
  edges: [ParamsEdge!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* Param you could get from the connection."""
  totalCount: Int!
}

type Param implements Node {
  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!
  id: Int!
  name: String!
  value: String
  vhostId: Int!

  """Reads a single Vhost that is related to this Param."""
  vhostByVhostId: Vhost
}

"""A Param edge in the connection."""
type ParamsEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The Param at the end of the edge."""
  node: Param
}

"""Methods to use when ordering Param."""
enum ParamsOrderBy {
  NATURAL
  ID_ASC
  ID_DESC
  NAME_ASC
  NAME_DESC
  VALUE_ASC
  VALUE_DESC
  VHOST_ID_ASC
  VHOST_ID_DESC
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
}

"""
A condition to be used against Param object types. All fields are tested for equality and combined with a logical ‘and.’
"""
input ParamCondition {
  """Checks for equality with the object’s id field."""
  id: Int

  """Checks for equality with the object’s name field."""
  name: String

  """Checks for equality with the object’s value field."""
  value: String

  """Checks for equality with the object’s vhostId field."""
  vhostId: Int
}

"""A connection to a list of Url values."""
type UrlsConnection {
  """A list of Url objects."""
  nodes: [Url]!

  """
  A list of edges which contains the Url and cursor to aid in pagination.
  """
  edges: [UrlsEdge!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* Url you could get from the connection."""
  totalCount: Int!
}

type Url implements Node {
  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!
  id: Int!
  url: String!
  vhostId: Int!
  info: String

  """Reads a single Vhost that is related to this Url."""
  vhostByVhostId: Vhost

  """Reads and enables pagination through a set of Request."""
  requestsByUrlId(
    """Only read the first n values of the set."""
    first: Int

    """Only read the last n values of the set."""
    last: Int

    """
    Skip the first n values from our after cursor, an alternative to cursor
    based pagination. May not be used with last.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """The method to use when ordering Request."""
    orderBy: [RequestsOrderBy!] = [PRIMARY_KEY_ASC]

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: RequestCondition
  ): RequestsConnection!
}

"""A connection to a list of Request values."""
type RequestsConnection {
  """A list of Request objects."""
  nodes: [Request]!

  """
  A list of edges which contains the Request and cursor to aid in pagination.
  """
  edges: [RequestsEdge!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* Request you could get from the connection."""
  totalCount: Int!
}

type Request implements Node {
  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!
  id: Int!
  urlId: Int!
  createdAt: Datetime!
  method: String!
  status: Int
  response: String!
  info: String
  rawRequest: String!

  """Reads a single Url that is related to this Request."""
  urlByUrlId: Url
}

"""A Request edge in the connection."""
type RequestsEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The Request at the end of the edge."""
  node: Request
}

"""Methods to use when ordering Request."""
enum RequestsOrderBy {
  NATURAL
  ID_ASC
  ID_DESC
  URL_ID_ASC
  URL_ID_DESC
  CREATED_AT_ASC
  CREATED_AT_DESC
  METHOD_ASC
  METHOD_DESC
  STATUS_ASC
  STATUS_DESC
  RESPONSE_ASC
  RESPONSE_DESC
  INFO_ASC
  INFO_DESC
  RAW_REQUEST_ASC
  RAW_REQUEST_DESC
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
}

"""
A condition to be used against Request object types. All fields are tested for equality and combined with a logical ‘and.’
"""
input RequestCondition {
  """Checks for equality with the object’s id field."""
  id: Int

  """Checks for equality with the object’s urlId field."""
  urlId: Int

  """Checks for equality with the object’s createdAt field."""
  createdAt: Datetime

  """Checks for equality with the object’s method field."""
  method: String

  """Checks for equality with the object’s status field."""
  status: Int

  """Checks for equality with the object’s response field."""
  response: String

  """Checks for equality with the object’s info field."""
  info: String

  """Checks for equality with the object’s rawRequest field."""
  rawRequest: String
}

"""A Url edge in the connection."""
type UrlsEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The Url at the end of the edge."""
  node: Url
}

"""Methods to use when ordering Url."""
enum UrlsOrderBy {
  NATURAL
  ID_ASC
  ID_DESC
  URL_ASC
  URL_DESC
  VHOST_ID_ASC
  VHOST_ID_DESC
  INFO_ASC
  INFO_DESC
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
}

"""
A condition to be used against Url object types. All fields are tested for equality and combined with a logical ‘and.’
"""
input UrlCondition {
  """Checks for equality with the object’s id field."""
  id: Int

  """Checks for equality with the object’s url field."""
  url: String

  """Checks for equality with the object’s vhostId field."""
  vhostId: Int

  """Checks for equality with the object’s info field."""
  info: String
}

"""Methods to use when ordering VhostPort."""
enum VhostPortsOrderBy {
  NATURAL
  VHOST_ID_ASC
  VHOST_ID_DESC
  PORT_ID_ASC
  PORT_ID_DESC
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
}

"""
A condition to be used against VhostPort object types. All fields are tested
for equality and combined with a logical ‘and.’
"""
input VhostPortCondition {
  """Checks for equality with the object’s vhostId field."""
  vhostId: Int

  """Checks for equality with the object’s portId field."""
  portId: Int
}

"""A VhostPort edge in the connection."""
type VhostPortsEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The VhostPort at the end of the edge."""
  node: VhostPort
}

"""A Port edge in the connection."""
type PortsEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The Port at the end of the edge."""
  node: Port
}

"""Methods to use when ordering Port."""
enum PortsOrderBy {
  NATURAL
  ID_ASC
  ID_DESC
  NUMBER_ASC
  NUMBER_DESC
  HOST_ID_ASC
  HOST_ID_DESC
  INFO_ASC
  INFO_DESC
  PROTOCOL_ASC
  PROTOCOL_DESC
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
}

"""
A condition to be used against Port object types. All fields are tested for equality and combined with a logical ‘and.’
"""
input PortCondition {
  """Checks for equality with the object’s id field."""
  id: Int

  """Checks for equality with the object’s number field."""
  number: Int

  """Checks for equality with the object’s hostId field."""
  hostId: Int

  """Checks for equality with the object’s info field."""
  info: String

  """Checks for equality with the object’s protocol field."""
  protocol: String
}

"""A DomainsHost edge in the connection."""
type DomainsHostsEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The DomainsHost at the end of the edge."""
  node: DomainsHost
}

"""A Domain edge in the connection."""
type DomainsEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The Domain at the end of the edge."""
  node: Domain
}

"""Methods to use when ordering Domain."""
enum DomainsOrderBy {
  NATURAL
  ID_ASC
  ID_DESC
  NAME_ASC
  NAME_DESC
  INFO_ASC
  INFO_DESC
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
}

"""
A condition to be used against Domain object types. All fields are tested for equality and combined with a logical ‘and.’
"""
input DomainCondition {
  """Checks for equality with the object’s id field."""
  id: Int

  """Checks for equality with the object’s name field."""
  name: String

  """Checks for equality with the object’s info field."""
  info: String
}

"""A connection to a list of Extractor values."""
type ExtractorsConnection {
  """A list of Extractor objects."""
  nodes: [Extractor]!

  """
  A list of edges which contains the Extractor and cursor to aid in pagination.
  """
  edges: [ExtractorsEdge!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* Extractor you could get from the connection."""
  totalCount: Int!
}

type Extractor implements Node {
  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!
  id: Int!
  name: String!
  description: String
  code: String
}

"""A Extractor edge in the connection."""
type ExtractorsEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The Extractor at the end of the edge."""
  node: Extractor
}

"""Methods to use when ordering Extractor."""
enum ExtractorsOrderBy {
  NATURAL
  ID_ASC
  ID_DESC
  NAME_ASC
  NAME_DESC
  DESCRIPTION_ASC
  DESCRIPTION_DESC
  CODE_ASC
  CODE_DESC
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
}

"""
A condition to be used against Extractor object types. All fields are tested
for equality and combined with a logical ‘and.’
"""
input ExtractorCondition {
  """Checks for equality with the object’s id field."""
  id: Int

  """Checks for equality with the object’s name field."""
  name: String

  """Checks for equality with the object’s description field."""
  description: String

  """Checks for equality with the object’s code field."""
  code: String
}

"""A connection to a list of Keyword values."""
type KeywordsConnection {
  """A list of Keyword objects."""
  nodes: [Keyword]!

  """
  A list of edges which contains the Keyword and cursor to aid in pagination.
  """
  edges: [KeywordsEdge!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* Keyword you could get from the connection."""
  totalCount: Int!
}

type Keyword implements Node {
  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  nodeId: ID!
  id: Int!
  name: String!
  source: JSON!
  info: String
}

"""
A JavaScript object encoded in the JSON format as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
"""
scalar JSON

"""A Keyword edge in the connection."""
type KeywordsEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The Keyword at the end of the edge."""
  node: Keyword
}

"""Methods to use when ordering Keyword."""
enum KeywordsOrderBy {
  NATURAL
  ID_ASC
  ID_DESC
  NAME_ASC
  NAME_DESC
  SOURCE_ASC
  SOURCE_DESC
  INFO_ASC
  INFO_DESC
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
}

"""
A condition to be used against Keyword object types. All fields are tested for equality and combined with a logical ‘and.’
"""
input KeywordCondition {
  """Checks for equality with the object’s id field."""
  id: Int

  """Checks for equality with the object’s name field."""
  name: String

  """Checks for equality with the object’s source field."""
  source: JSON

  """Checks for equality with the object’s info field."""
  info: String
}

"""A connection to a list of Subnet values."""
type SubnetsConnection {
  """A list of Subnet objects."""
  nodes: [Subnet]!

  """
  A list of edges which contains the Subnet and cursor to aid in pagination.
  """
  edges: [SubnetsEdge!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* Subnet you could get from the connection."""
  totalCount: Int!
}

"""A Subnet edge in the connection."""
type SubnetsEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The Subnet at the end of the edge."""
  node: Subnet
}

"""Methods to use when ordering Subnet."""
enum SubnetsOrderBy {
  NATURAL
  ID_ASC
  ID_DESC
  CIDR_ASC
  CIDR_DESC
  NAME_ASC
  NAME_DESC
  DESCRIPTION_ASC
  DESCRIPTION_DESC
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
}

"""
A condition to be used against Subnet object types. All fields are tested for equality and combined with a logical ‘and.’
"""
input SubnetCondition {
  """Checks for equality with the object’s id field."""
  id: Int

  """Checks for equality with the object’s cidr field."""
  cidr: String

  """Checks for equality with the object’s name field."""
  name: String

  """Checks for equality with the object’s description field."""
  description: String
}

"""A connection to a list of Tool values."""
type ToolsConnection {
  """A list of Tool objects."""
  nodes: [Tool]!

  """
  A list of edges which contains the Tool and cursor to aid in pagination.
  """
  edges: [ToolsEdge!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* Tool you could get from the connection."""
  totalCount: Int!
}

"""A Tool edge in the connection."""
type ToolsEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The Tool at the end of the edge."""
  node: Tool
}

"""Methods to use when ordering Tool."""
enum ToolsOrderBy {
  NATURAL
  ID_ASC
  ID_DESC
  NAME_ASC
  NAME_DESC
  DESCRIPTION_ASC
  DESCRIPTION_DESC
  COMMAND_ASC
  COMMAND_DESC
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
}

"""
A condition to be used against Tool object types. All fields are tested for equality and combined with a logical ‘and.’
"""
input ToolCondition {
  """Checks for equality with the object’s id field."""
  id: Int

  """Checks for equality with the object’s name field."""
  name: String

  """Checks for equality with the object’s description field."""
  description: String

  """Checks for equality with the object’s command field."""
  command: String
}

"""A connection to a list of Vhost values."""
type VhostsConnection {
  """A list of Vhost objects."""
  nodes: [Vhost]!

  """
  A list of edges which contains the Vhost and cursor to aid in pagination.
  """
  edges: [VhostsEdge!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* Vhost you could get from the connection."""
  totalCount: Int!
}

"""A Vhost edge in the connection."""
type VhostsEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The Vhost at the end of the edge."""
  node: Vhost
}

"""Methods to use when ordering Vhost."""
enum VhostsOrderBy {
  NATURAL
  ID_ASC
  ID_DESC
  NAME_ASC
  NAME_DESC
  INFO_ASC
  INFO_DESC
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
}

"""
A condition to be used against Vhost object types. All fields are tested for equality and combined with a logical ‘and.’
"""
input VhostCondition {
  """Checks for equality with the object’s id field."""
  id: Int

  """Checks for equality with the object’s name field."""
  name: String

  """Checks for equality with the object’s info field."""
  info: String
}

"""
The root mutation type which contains root level fields which mutate data.
"""
type Mutation {
  """Creates a single _PrismaMigration."""
  createPrismaMigration(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreatePrismaMigrationInput!
  ): CreatePrismaMigrationPayload

  """Creates a single Agent."""
  createAgent(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateAgentInput!
  ): CreateAgentPayload

  """Creates a single Domain."""
  createDomain(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateDomainInput!
  ): CreateDomainPayload

  """Creates a single DomainsHost."""
  createDomainsHost(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateDomainsHostInput!
  ): CreateDomainsHostPayload

  """Creates a single Extractor."""
  createExtractor(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateExtractorInput!
  ): CreateExtractorPayload

  """Creates a single Host."""
  createHost(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateHostInput!
  ): CreateHostPayload

  """Creates a single Keyword."""
  createKeyword(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateKeywordInput!
  ): CreateKeywordPayload

  """Creates a single Param."""
  createParam(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateParamInput!
  ): CreateParamPayload

  """Creates a single Port."""
  createPort(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreatePortInput!
  ): CreatePortPayload

  """Creates a single Request."""
  createRequest(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateRequestInput!
  ): CreateRequestPayload

  """Creates a single Scan."""
  createScan(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateScanInput!
  ): CreateScanPayload

  """Creates a single Subnet."""
  createSubnet(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateSubnetInput!
  ): CreateSubnetPayload

  """Creates a single Tool."""
  createTool(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateToolInput!
  ): CreateToolPayload

  """Creates a single Url."""
  createUrl(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateUrlInput!
  ): CreateUrlPayload

  """Creates a single VhostPort."""
  createVhostPort(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateVhostPortInput!
  ): CreateVhostPortPayload

  """Creates a single Vhost."""
  createVhost(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateVhostInput!
  ): CreateVhostPayload

  """
  Updates a single _PrismaMigration using its globally unique id and a patch.
  """
  updatePrismaMigration(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdatePrismaMigrationInput!
  ): UpdatePrismaMigrationPayload

  """Updates a single _PrismaMigration using a unique key and a patch."""
  updatePrismaMigrationById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdatePrismaMigrationByIdInput!
  ): UpdatePrismaMigrationPayload

  """Updates a single Agent using its globally unique id and a patch."""
  updateAgent(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateAgentInput!
  ): UpdateAgentPayload

  """Updates a single Agent using a unique key and a patch."""
  updateAgentById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateAgentByIdInput!
  ): UpdateAgentPayload

  """Updates a single Domain using its globally unique id and a patch."""
  updateDomain(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateDomainInput!
  ): UpdateDomainPayload

  """Updates a single Domain using a unique key and a patch."""
  updateDomainById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateDomainByIdInput!
  ): UpdateDomainPayload

  """
  Updates a single DomainsHost using its globally unique id and a patch.
  """
  updateDomainsHost(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateDomainsHostInput!
  ): UpdateDomainsHostPayload

  """Updates a single DomainsHost using a unique key and a patch."""
  updateDomainsHostByDomainIdAndHostId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateDomainsHostByDomainIdAndHostIdInput!
  ): UpdateDomainsHostPayload

  """Updates a single Extractor using its globally unique id and a patch."""
  updateExtractor(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateExtractorInput!
  ): UpdateExtractorPayload

  """Updates a single Extractor using a unique key and a patch."""
  updateExtractorById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateExtractorByIdInput!
  ): UpdateExtractorPayload

  """Updates a single Host using its globally unique id and a patch."""
  updateHost(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateHostInput!
  ): UpdateHostPayload

  """Updates a single Host using a unique key and a patch."""
  updateHostById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateHostByIdInput!
  ): UpdateHostPayload

  """Updates a single Keyword using its globally unique id and a patch."""
  updateKeyword(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateKeywordInput!
  ): UpdateKeywordPayload

  """Updates a single Keyword using a unique key and a patch."""
  updateKeywordById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateKeywordByIdInput!
  ): UpdateKeywordPayload

  """Updates a single Param using its globally unique id and a patch."""
  updateParam(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateParamInput!
  ): UpdateParamPayload

  """Updates a single Param using a unique key and a patch."""
  updateParamById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateParamByIdInput!
  ): UpdateParamPayload

  """Updates a single Port using its globally unique id and a patch."""
  updatePort(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdatePortInput!
  ): UpdatePortPayload

  """Updates a single Port using a unique key and a patch."""
  updatePortById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdatePortByIdInput!
  ): UpdatePortPayload

  """Updates a single Request using its globally unique id and a patch."""
  updateRequest(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateRequestInput!
  ): UpdateRequestPayload

  """Updates a single Request using a unique key and a patch."""
  updateRequestById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateRequestByIdInput!
  ): UpdateRequestPayload

  """Updates a single Scan using its globally unique id and a patch."""
  updateScan(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateScanInput!
  ): UpdateScanPayload

  """Updates a single Scan using a unique key and a patch."""
  updateScanById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateScanByIdInput!
  ): UpdateScanPayload

  """Updates a single Subnet using its globally unique id and a patch."""
  updateSubnet(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateSubnetInput!
  ): UpdateSubnetPayload

  """Updates a single Subnet using a unique key and a patch."""
  updateSubnetById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateSubnetByIdInput!
  ): UpdateSubnetPayload

  """Updates a single Tool using its globally unique id and a patch."""
  updateTool(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateToolInput!
  ): UpdateToolPayload

  """Updates a single Tool using a unique key and a patch."""
  updateToolById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateToolByIdInput!
  ): UpdateToolPayload

  """Updates a single Url using its globally unique id and a patch."""
  updateUrl(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateUrlInput!
  ): UpdateUrlPayload

  """Updates a single Url using a unique key and a patch."""
  updateUrlById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateUrlByIdInput!
  ): UpdateUrlPayload

  """Updates a single VhostPort using its globally unique id and a patch."""
  updateVhostPort(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateVhostPortInput!
  ): UpdateVhostPortPayload

  """Updates a single VhostPort using a unique key and a patch."""
  updateVhostPortByVhostIdAndPortId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateVhostPortByVhostIdAndPortIdInput!
  ): UpdateVhostPortPayload

  """Updates a single Vhost using its globally unique id and a patch."""
  updateVhost(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateVhostInput!
  ): UpdateVhostPayload

  """Updates a single Vhost using a unique key and a patch."""
  updateVhostById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateVhostByIdInput!
  ): UpdateVhostPayload

  """Deletes a single _PrismaMigration using its globally unique id."""
  deletePrismaMigration(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeletePrismaMigrationInput!
  ): DeletePrismaMigrationPayload

  """Deletes a single _PrismaMigration using a unique key."""
  deletePrismaMigrationById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeletePrismaMigrationByIdInput!
  ): DeletePrismaMigrationPayload

  """Deletes a single Agent using its globally unique id."""
  deleteAgent(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteAgentInput!
  ): DeleteAgentPayload

  """Deletes a single Agent using a unique key."""
  deleteAgentById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteAgentByIdInput!
  ): DeleteAgentPayload

  """Deletes a single Domain using its globally unique id."""
  deleteDomain(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteDomainInput!
  ): DeleteDomainPayload

  """Deletes a single Domain using a unique key."""
  deleteDomainById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteDomainByIdInput!
  ): DeleteDomainPayload

  """Deletes a single DomainsHost using its globally unique id."""
  deleteDomainsHost(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteDomainsHostInput!
  ): DeleteDomainsHostPayload

  """Deletes a single DomainsHost using a unique key."""
  deleteDomainsHostByDomainIdAndHostId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteDomainsHostByDomainIdAndHostIdInput!
  ): DeleteDomainsHostPayload

  """Deletes a single Extractor using its globally unique id."""
  deleteExtractor(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteExtractorInput!
  ): DeleteExtractorPayload

  """Deletes a single Extractor using a unique key."""
  deleteExtractorById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteExtractorByIdInput!
  ): DeleteExtractorPayload

  """Deletes a single Host using its globally unique id."""
  deleteHost(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteHostInput!
  ): DeleteHostPayload

  """Deletes a single Host using a unique key."""
  deleteHostById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteHostByIdInput!
  ): DeleteHostPayload

  """Deletes a single Keyword using its globally unique id."""
  deleteKeyword(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteKeywordInput!
  ): DeleteKeywordPayload

  """Deletes a single Keyword using a unique key."""
  deleteKeywordById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteKeywordByIdInput!
  ): DeleteKeywordPayload

  """Deletes a single Param using its globally unique id."""
  deleteParam(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteParamInput!
  ): DeleteParamPayload

  """Deletes a single Param using a unique key."""
  deleteParamById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteParamByIdInput!
  ): DeleteParamPayload

  """Deletes a single Port using its globally unique id."""
  deletePort(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeletePortInput!
  ): DeletePortPayload

  """Deletes a single Port using a unique key."""
  deletePortById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeletePortByIdInput!
  ): DeletePortPayload

  """Deletes a single Request using its globally unique id."""
  deleteRequest(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteRequestInput!
  ): DeleteRequestPayload

  """Deletes a single Request using a unique key."""
  deleteRequestById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteRequestByIdInput!
  ): DeleteRequestPayload

  """Deletes a single Scan using its globally unique id."""
  deleteScan(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteScanInput!
  ): DeleteScanPayload

  """Deletes a single Scan using a unique key."""
  deleteScanById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteScanByIdInput!
  ): DeleteScanPayload

  """Deletes a single Subnet using its globally unique id."""
  deleteSubnet(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteSubnetInput!
  ): DeleteSubnetPayload

  """Deletes a single Subnet using a unique key."""
  deleteSubnetById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteSubnetByIdInput!
  ): DeleteSubnetPayload

  """Deletes a single Tool using its globally unique id."""
  deleteTool(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteToolInput!
  ): DeleteToolPayload

  """Deletes a single Tool using a unique key."""
  deleteToolById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteToolByIdInput!
  ): DeleteToolPayload

  """Deletes a single Url using its globally unique id."""
  deleteUrl(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteUrlInput!
  ): DeleteUrlPayload

  """Deletes a single Url using a unique key."""
  deleteUrlById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteUrlByIdInput!
  ): DeleteUrlPayload

  """Deletes a single VhostPort using its globally unique id."""
  deleteVhostPort(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteVhostPortInput!
  ): DeleteVhostPortPayload

  """Deletes a single VhostPort using a unique key."""
  deleteVhostPortByVhostIdAndPortId(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteVhostPortByVhostIdAndPortIdInput!
  ): DeleteVhostPortPayload

  """Deletes a single Vhost using its globally unique id."""
  deleteVhost(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteVhostInput!
  ): DeleteVhostPayload

  """Deletes a single Vhost using a unique key."""
  deleteVhostById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteVhostByIdInput!
  ): DeleteVhostPayload
}

"""The output of our create _PrismaMigration mutation."""
type CreatePrismaMigrationPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The _PrismaMigration that was created by this mutation."""
  _prismaMigration: _PrismaMigration

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our _PrismaMigration. May be used by Relay 1."""
  _prismaMigrationEdge(
    """The method to use when ordering _PrismaMigration."""
    orderBy: [_PrismaMigrationsOrderBy!] = [PRIMARY_KEY_ASC]
  ): _PrismaMigrationsEdge
}

"""All input for the create _PrismaMigration mutation."""
input CreatePrismaMigrationInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The _PrismaMigration to be created by this mutation."""
  _prismaMigration: _PrismaMigrationInput!
}

"""An input for mutations affecting _PrismaMigration"""
input _PrismaMigrationInput {
  id: String!
  checksum: String!
  finishedAt: Datetime
  migrationName: String!
  logs: String
  rolledBackAt: Datetime
  startedAt: Datetime
  appliedStepsCount: Int
}

"""The output of our create Agent mutation."""
type CreateAgentPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Agent that was created by this mutation."""
  agent: Agent

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our Agent. May be used by Relay 1."""
  agentEdge(
    """The method to use when ordering Agent."""
    orderBy: [AgentsOrderBy!] = [PRIMARY_KEY_ASC]
  ): AgentsEdge
}

"""All input for the create Agent mutation."""
input CreateAgentInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The Agent to be created by this mutation."""
  agent: AgentInput!
}

"""An input for mutations affecting Agent"""
input AgentInput {
  id: Int
  name: String!
  description: String
  url: String!
  token: String!
  status: String!
}

"""The output of our create Domain mutation."""
type CreateDomainPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Domain that was created by this mutation."""
  domain: Domain

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our Domain. May be used by Relay 1."""
  domainEdge(
    """The method to use when ordering Domain."""
    orderBy: [DomainsOrderBy!] = [PRIMARY_KEY_ASC]
  ): DomainsEdge
}

"""All input for the create Domain mutation."""
input CreateDomainInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The Domain to be created by this mutation."""
  domain: DomainInput!
}

"""An input for mutations affecting Domain"""
input DomainInput {
  id: Int
  name: String!
  info: String
}

"""The output of our create DomainsHost mutation."""
type CreateDomainsHostPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The DomainsHost that was created by this mutation."""
  domainsHost: DomainsHost

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """Reads a single Domain that is related to this DomainsHost."""
  domainByDomainId: Domain

  """Reads a single Host that is related to this DomainsHost."""
  hostByHostId: Host

  """An edge for our DomainsHost. May be used by Relay 1."""
  domainsHostEdge(
    """The method to use when ordering DomainsHost."""
    orderBy: [DomainsHostsOrderBy!] = [PRIMARY_KEY_ASC]
  ): DomainsHostsEdge
}

"""All input for the create DomainsHost mutation."""
input CreateDomainsHostInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The DomainsHost to be created by this mutation."""
  domainsHost: DomainsHostInput!
}

"""An input for mutations affecting DomainsHost"""
input DomainsHostInput {
  domainId: Int!
  hostId: Int!
}

"""The output of our create Extractor mutation."""
type CreateExtractorPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Extractor that was created by this mutation."""
  extractor: Extractor

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our Extractor. May be used by Relay 1."""
  extractorEdge(
    """The method to use when ordering Extractor."""
    orderBy: [ExtractorsOrderBy!] = [PRIMARY_KEY_ASC]
  ): ExtractorsEdge
}

"""All input for the create Extractor mutation."""
input CreateExtractorInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The Extractor to be created by this mutation."""
  extractor: ExtractorInput!
}

"""An input for mutations affecting Extractor"""
input ExtractorInput {
  id: Int
  name: String!
  description: String
  code: String
}

"""The output of our create Host mutation."""
type CreateHostPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Host that was created by this mutation."""
  host: Host

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """Reads a single Subnet that is related to this Host."""
  subnetBySubnetId: Subnet

  """An edge for our Host. May be used by Relay 1."""
  hostEdge(
    """The method to use when ordering Host."""
    orderBy: [HostsOrderBy!] = [PRIMARY_KEY_ASC]
  ): HostsEdge
}

"""All input for the create Host mutation."""
input CreateHostInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The Host to be created by this mutation."""
  host: HostInput!
}

"""An input for mutations affecting Host"""
input HostInput {
  id: Int
  ip: String!
  info: String
  subnetId: Int
}

"""The output of our create Keyword mutation."""
type CreateKeywordPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Keyword that was created by this mutation."""
  keyword: Keyword

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our Keyword. May be used by Relay 1."""
  keywordEdge(
    """The method to use when ordering Keyword."""
    orderBy: [KeywordsOrderBy!] = [PRIMARY_KEY_ASC]
  ): KeywordsEdge
}

"""All input for the create Keyword mutation."""
input CreateKeywordInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The Keyword to be created by this mutation."""
  keyword: KeywordInput!
}

"""An input for mutations affecting Keyword"""
input KeywordInput {
  id: Int
  name: String!
  source: JSON!
  info: String
}

"""The output of our create Param mutation."""
type CreateParamPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Param that was created by this mutation."""
  param: Param

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """Reads a single Vhost that is related to this Param."""
  vhostByVhostId: Vhost

  """An edge for our Param. May be used by Relay 1."""
  paramEdge(
    """The method to use when ordering Param."""
    orderBy: [ParamsOrderBy!] = [PRIMARY_KEY_ASC]
  ): ParamsEdge
}

"""All input for the create Param mutation."""
input CreateParamInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The Param to be created by this mutation."""
  param: ParamInput!
}

"""An input for mutations affecting Param"""
input ParamInput {
  id: Int
  name: String!
  value: String
  vhostId: Int!
}

"""The output of our create Port mutation."""
type CreatePortPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Port that was created by this mutation."""
  port: Port

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """Reads a single Host that is related to this Port."""
  hostByHostId: Host

  """An edge for our Port. May be used by Relay 1."""
  portEdge(
    """The method to use when ordering Port."""
    orderBy: [PortsOrderBy!] = [PRIMARY_KEY_ASC]
  ): PortsEdge
}

"""All input for the create Port mutation."""
input CreatePortInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The Port to be created by this mutation."""
  port: PortInput!
}

"""An input for mutations affecting Port"""
input PortInput {
  id: Int
  number: Int!
  hostId: Int!
  info: String
  protocol: String!
}

"""The output of our create Request mutation."""
type CreateRequestPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Request that was created by this mutation."""
  request: Request

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """Reads a single Url that is related to this Request."""
  urlByUrlId: Url

  """An edge for our Request. May be used by Relay 1."""
  requestEdge(
    """The method to use when ordering Request."""
    orderBy: [RequestsOrderBy!] = [PRIMARY_KEY_ASC]
  ): RequestsEdge
}

"""All input for the create Request mutation."""
input CreateRequestInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The Request to be created by this mutation."""
  request: RequestInput!
}

"""An input for mutations affecting Request"""
input RequestInput {
  id: Int
  urlId: Int!
  createdAt: Datetime
  method: String!
  status: Int
  response: String!
  info: String
  rawRequest: String!
}

"""The output of our create Scan mutation."""
type CreateScanPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Scan that was created by this mutation."""
  scan: Scan

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """Reads a single Agent that is related to this Scan."""
  agentByAgentId: Agent

  """Reads a single Tool that is related to this Scan."""
  toolByToolId: Tool

  """An edge for our Scan. May be used by Relay 1."""
  scanEdge(
    """The method to use when ordering Scan."""
    orderBy: [ScansOrderBy!] = [PRIMARY_KEY_ASC]
  ): ScansEdge
}

"""All input for the create Scan mutation."""
input CreateScanInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The Scan to be created by this mutation."""
  scan: ScanInput!
}

"""An input for mutations affecting Scan"""
input ScanInput {
  id: Int
  startTime: Datetime!
  endTime: Datetime
  status: String
  stdout: String
  stderr: String
  description: String
  agentId: Int
  toolId: Int
}

"""The output of our create Subnet mutation."""
type CreateSubnetPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Subnet that was created by this mutation."""
  subnet: Subnet

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our Subnet. May be used by Relay 1."""
  subnetEdge(
    """The method to use when ordering Subnet."""
    orderBy: [SubnetsOrderBy!] = [PRIMARY_KEY_ASC]
  ): SubnetsEdge
}

"""All input for the create Subnet mutation."""
input CreateSubnetInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The Subnet to be created by this mutation."""
  subnet: SubnetInput!
}

"""An input for mutations affecting Subnet"""
input SubnetInput {
  id: Int
  cidr: String!
  name: String
  description: String
}

"""The output of our create Tool mutation."""
type CreateToolPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Tool that was created by this mutation."""
  tool: Tool

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our Tool. May be used by Relay 1."""
  toolEdge(
    """The method to use when ordering Tool."""
    orderBy: [ToolsOrderBy!] = [PRIMARY_KEY_ASC]
  ): ToolsEdge
}

"""All input for the create Tool mutation."""
input CreateToolInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The Tool to be created by this mutation."""
  tool: ToolInput!
}

"""An input for mutations affecting Tool"""
input ToolInput {
  id: Int
  name: String!
  description: String
  command: String!
}

"""The output of our create Url mutation."""
type CreateUrlPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Url that was created by this mutation."""
  url: Url

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """Reads a single Vhost that is related to this Url."""
  vhostByVhostId: Vhost

  """An edge for our Url. May be used by Relay 1."""
  urlEdge(
    """The method to use when ordering Url."""
    orderBy: [UrlsOrderBy!] = [PRIMARY_KEY_ASC]
  ): UrlsEdge
}

"""All input for the create Url mutation."""
input CreateUrlInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The Url to be created by this mutation."""
  url: UrlInput!
}

"""An input for mutations affecting Url"""
input UrlInput {
  id: Int
  url: String!
  vhostId: Int!
  info: String
}

"""The output of our create VhostPort mutation."""
type CreateVhostPortPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The VhostPort that was created by this mutation."""
  vhostPort: VhostPort

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """Reads a single Vhost that is related to this VhostPort."""
  vhostByVhostId: Vhost

  """Reads a single Port that is related to this VhostPort."""
  portByPortId: Port

  """An edge for our VhostPort. May be used by Relay 1."""
  vhostPortEdge(
    """The method to use when ordering VhostPort."""
    orderBy: [VhostPortsOrderBy!] = [PRIMARY_KEY_ASC]
  ): VhostPortsEdge
}

"""All input for the create VhostPort mutation."""
input CreateVhostPortInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The VhostPort to be created by this mutation."""
  vhostPort: VhostPortInput!
}

"""An input for mutations affecting VhostPort"""
input VhostPortInput {
  vhostId: Int!
  portId: Int!
}

"""The output of our create Vhost mutation."""
type CreateVhostPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Vhost that was created by this mutation."""
  vhost: Vhost

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our Vhost. May be used by Relay 1."""
  vhostEdge(
    """The method to use when ordering Vhost."""
    orderBy: [VhostsOrderBy!] = [PRIMARY_KEY_ASC]
  ): VhostsEdge
}

"""All input for the create Vhost mutation."""
input CreateVhostInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The Vhost to be created by this mutation."""
  vhost: VhostInput!
}

"""An input for mutations affecting Vhost"""
input VhostInput {
  id: Int
  name: String!
  info: String
}

"""The output of our update _PrismaMigration mutation."""
type UpdatePrismaMigrationPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The _PrismaMigration that was updated by this mutation."""
  _prismaMigration: _PrismaMigration

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our _PrismaMigration. May be used by Relay 1."""
  _prismaMigrationEdge(
    """The method to use when ordering _PrismaMigration."""
    orderBy: [_PrismaMigrationsOrderBy!] = [PRIMARY_KEY_ASC]
  ): _PrismaMigrationsEdge
}

"""All input for the updatePrismaMigration mutation."""
input UpdatePrismaMigrationInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single _PrismaMigration to be updated.
  """
  nodeId: ID!

  """
  An object where the defined keys will be set on the _PrismaMigration being updated.
  """
  _prismaMigrationPatch: _PrismaMigrationPatch!
}

"""
Represents an update to a _PrismaMigration. Fields that are set will be updated.
"""
input _PrismaMigrationPatch {
  id: String
  checksum: String
  finishedAt: Datetime
  migrationName: String
  logs: String
  rolledBackAt: Datetime
  startedAt: Datetime
  appliedStepsCount: Int
}

"""All input for the updatePrismaMigrationById mutation."""
input UpdatePrismaMigrationByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  An object where the defined keys will be set on the _PrismaMigration being updated.
  """
  _prismaMigrationPatch: _PrismaMigrationPatch!
  id: String!
}

"""The output of our update Agent mutation."""
type UpdateAgentPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Agent that was updated by this mutation."""
  agent: Agent

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our Agent. May be used by Relay 1."""
  agentEdge(
    """The method to use when ordering Agent."""
    orderBy: [AgentsOrderBy!] = [PRIMARY_KEY_ASC]
  ): AgentsEdge
}

"""All input for the updateAgent mutation."""
input UpdateAgentInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Agent to be updated.
  """
  nodeId: ID!

  """
  An object where the defined keys will be set on the Agent being updated.
  """
  agentPatch: AgentPatch!
}

"""
Represents an update to a Agent. Fields that are set will be updated.
"""
input AgentPatch {
  id: Int
  name: String
  description: String
  url: String
  token: String
  status: String
}

"""All input for the updateAgentById mutation."""
input UpdateAgentByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  An object where the defined keys will be set on the Agent being updated.
  """
  agentPatch: AgentPatch!
  id: Int!
}

"""The output of our update Domain mutation."""
type UpdateDomainPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Domain that was updated by this mutation."""
  domain: Domain

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our Domain. May be used by Relay 1."""
  domainEdge(
    """The method to use when ordering Domain."""
    orderBy: [DomainsOrderBy!] = [PRIMARY_KEY_ASC]
  ): DomainsEdge
}

"""All input for the updateDomain mutation."""
input UpdateDomainInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Domain to be updated.
  """
  nodeId: ID!

  """
  An object where the defined keys will be set on the Domain being updated.
  """
  domainPatch: DomainPatch!
}

"""
Represents an update to a Domain. Fields that are set will be updated.
"""
input DomainPatch {
  id: Int
  name: String
  info: String
}

"""All input for the updateDomainById mutation."""
input UpdateDomainByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  An object where the defined keys will be set on the Domain being updated.
  """
  domainPatch: DomainPatch!
  id: Int!
}

"""The output of our update DomainsHost mutation."""
type UpdateDomainsHostPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The DomainsHost that was updated by this mutation."""
  domainsHost: DomainsHost

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """Reads a single Domain that is related to this DomainsHost."""
  domainByDomainId: Domain

  """Reads a single Host that is related to this DomainsHost."""
  hostByHostId: Host

  """An edge for our DomainsHost. May be used by Relay 1."""
  domainsHostEdge(
    """The method to use when ordering DomainsHost."""
    orderBy: [DomainsHostsOrderBy!] = [PRIMARY_KEY_ASC]
  ): DomainsHostsEdge
}

"""All input for the updateDomainsHost mutation."""
input UpdateDomainsHostInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single DomainsHost to be updated.
  """
  nodeId: ID!

  """
  An object where the defined keys will be set on the DomainsHost being updated.
  """
  domainsHostPatch: DomainsHostPatch!
}

"""
Represents an update to a DomainsHost. Fields that are set will be updated.
"""
input DomainsHostPatch {
  domainId: Int
  hostId: Int
}

"""All input for the updateDomainsHostByDomainIdAndHostId mutation."""
input UpdateDomainsHostByDomainIdAndHostIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  An object where the defined keys will be set on the DomainsHost being updated.
  """
  domainsHostPatch: DomainsHostPatch!
  domainId: Int!
  hostId: Int!
}

"""The output of our update Extractor mutation."""
type UpdateExtractorPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Extractor that was updated by this mutation."""
  extractor: Extractor

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our Extractor. May be used by Relay 1."""
  extractorEdge(
    """The method to use when ordering Extractor."""
    orderBy: [ExtractorsOrderBy!] = [PRIMARY_KEY_ASC]
  ): ExtractorsEdge
}

"""All input for the updateExtractor mutation."""
input UpdateExtractorInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Extractor to be updated.
  """
  nodeId: ID!

  """
  An object where the defined keys will be set on the Extractor being updated.
  """
  extractorPatch: ExtractorPatch!
}

"""
Represents an update to a Extractor. Fields that are set will be updated.
"""
input ExtractorPatch {
  id: Int
  name: String
  description: String
  code: String
}

"""All input for the updateExtractorById mutation."""
input UpdateExtractorByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  An object where the defined keys will be set on the Extractor being updated.
  """
  extractorPatch: ExtractorPatch!
  id: Int!
}

"""The output of our update Host mutation."""
type UpdateHostPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Host that was updated by this mutation."""
  host: Host

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """Reads a single Subnet that is related to this Host."""
  subnetBySubnetId: Subnet

  """An edge for our Host. May be used by Relay 1."""
  hostEdge(
    """The method to use when ordering Host."""
    orderBy: [HostsOrderBy!] = [PRIMARY_KEY_ASC]
  ): HostsEdge
}

"""All input for the updateHost mutation."""
input UpdateHostInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Host to be updated.
  """
  nodeId: ID!

  """
  An object where the defined keys will be set on the Host being updated.
  """
  hostPatch: HostPatch!
}

"""Represents an update to a Host. Fields that are set will be updated."""
input HostPatch {
  id: Int
  ip: String
  info: String
  subnetId: Int
}

"""All input for the updateHostById mutation."""
input UpdateHostByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  An object where the defined keys will be set on the Host being updated.
  """
  hostPatch: HostPatch!
  id: Int!
}

"""The output of our update Keyword mutation."""
type UpdateKeywordPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Keyword that was updated by this mutation."""
  keyword: Keyword

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our Keyword. May be used by Relay 1."""
  keywordEdge(
    """The method to use when ordering Keyword."""
    orderBy: [KeywordsOrderBy!] = [PRIMARY_KEY_ASC]
  ): KeywordsEdge
}

"""All input for the updateKeyword mutation."""
input UpdateKeywordInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Keyword to be updated.
  """
  nodeId: ID!

  """
  An object where the defined keys will be set on the Keyword being updated.
  """
  keywordPatch: KeywordPatch!
}

"""
Represents an update to a Keyword. Fields that are set will be updated.
"""
input KeywordPatch {
  id: Int
  name: String
  source: JSON
  info: String
}

"""All input for the updateKeywordById mutation."""
input UpdateKeywordByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  An object where the defined keys will be set on the Keyword being updated.
  """
  keywordPatch: KeywordPatch!
  id: Int!
}

"""The output of our update Param mutation."""
type UpdateParamPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Param that was updated by this mutation."""
  param: Param

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """Reads a single Vhost that is related to this Param."""
  vhostByVhostId: Vhost

  """An edge for our Param. May be used by Relay 1."""
  paramEdge(
    """The method to use when ordering Param."""
    orderBy: [ParamsOrderBy!] = [PRIMARY_KEY_ASC]
  ): ParamsEdge
}

"""All input for the updateParam mutation."""
input UpdateParamInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Param to be updated.
  """
  nodeId: ID!

  """
  An object where the defined keys will be set on the Param being updated.
  """
  paramPatch: ParamPatch!
}

"""
Represents an update to a Param. Fields that are set will be updated.
"""
input ParamPatch {
  id: Int
  name: String
  value: String
  vhostId: Int
}

"""All input for the updateParamById mutation."""
input UpdateParamByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  An object where the defined keys will be set on the Param being updated.
  """
  paramPatch: ParamPatch!
  id: Int!
}

"""The output of our update Port mutation."""
type UpdatePortPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Port that was updated by this mutation."""
  port: Port

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """Reads a single Host that is related to this Port."""
  hostByHostId: Host

  """An edge for our Port. May be used by Relay 1."""
  portEdge(
    """The method to use when ordering Port."""
    orderBy: [PortsOrderBy!] = [PRIMARY_KEY_ASC]
  ): PortsEdge
}

"""All input for the updatePort mutation."""
input UpdatePortInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Port to be updated.
  """
  nodeId: ID!

  """
  An object where the defined keys will be set on the Port being updated.
  """
  portPatch: PortPatch!
}

"""Represents an update to a Port. Fields that are set will be updated."""
input PortPatch {
  id: Int
  number: Int
  hostId: Int
  info: String
  protocol: String
}

"""All input for the updatePortById mutation."""
input UpdatePortByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  An object where the defined keys will be set on the Port being updated.
  """
  portPatch: PortPatch!
  id: Int!
}

"""The output of our update Request mutation."""
type UpdateRequestPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Request that was updated by this mutation."""
  request: Request

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """Reads a single Url that is related to this Request."""
  urlByUrlId: Url

  """An edge for our Request. May be used by Relay 1."""
  requestEdge(
    """The method to use when ordering Request."""
    orderBy: [RequestsOrderBy!] = [PRIMARY_KEY_ASC]
  ): RequestsEdge
}

"""All input for the updateRequest mutation."""
input UpdateRequestInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Request to be updated.
  """
  nodeId: ID!

  """
  An object where the defined keys will be set on the Request being updated.
  """
  requestPatch: RequestPatch!
}

"""
Represents an update to a Request. Fields that are set will be updated.
"""
input RequestPatch {
  id: Int
  urlId: Int
  createdAt: Datetime
  method: String
  status: Int
  response: String
  info: String
  rawRequest: String
}

"""All input for the updateRequestById mutation."""
input UpdateRequestByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  An object where the defined keys will be set on the Request being updated.
  """
  requestPatch: RequestPatch!
  id: Int!
}

"""The output of our update Scan mutation."""
type UpdateScanPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Scan that was updated by this mutation."""
  scan: Scan

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """Reads a single Agent that is related to this Scan."""
  agentByAgentId: Agent

  """Reads a single Tool that is related to this Scan."""
  toolByToolId: Tool

  """An edge for our Scan. May be used by Relay 1."""
  scanEdge(
    """The method to use when ordering Scan."""
    orderBy: [ScansOrderBy!] = [PRIMARY_KEY_ASC]
  ): ScansEdge
}

"""All input for the updateScan mutation."""
input UpdateScanInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Scan to be updated.
  """
  nodeId: ID!

  """
  An object where the defined keys will be set on the Scan being updated.
  """
  scanPatch: ScanPatch!
}

"""Represents an update to a Scan. Fields that are set will be updated."""
input ScanPatch {
  id: Int
  startTime: Datetime
  endTime: Datetime
  status: String
  stdout: String
  stderr: String
  description: String
  agentId: Int
  toolId: Int
}

"""All input for the updateScanById mutation."""
input UpdateScanByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  An object where the defined keys will be set on the Scan being updated.
  """
  scanPatch: ScanPatch!
  id: Int!
}

"""The output of our update Subnet mutation."""
type UpdateSubnetPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Subnet that was updated by this mutation."""
  subnet: Subnet

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our Subnet. May be used by Relay 1."""
  subnetEdge(
    """The method to use when ordering Subnet."""
    orderBy: [SubnetsOrderBy!] = [PRIMARY_KEY_ASC]
  ): SubnetsEdge
}

"""All input for the updateSubnet mutation."""
input UpdateSubnetInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Subnet to be updated.
  """
  nodeId: ID!

  """
  An object where the defined keys will be set on the Subnet being updated.
  """
  subnetPatch: SubnetPatch!
}

"""
Represents an update to a Subnet. Fields that are set will be updated.
"""
input SubnetPatch {
  id: Int
  cidr: String
  name: String
  description: String
}

"""All input for the updateSubnetById mutation."""
input UpdateSubnetByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  An object where the defined keys will be set on the Subnet being updated.
  """
  subnetPatch: SubnetPatch!
  id: Int!
}

"""The output of our update Tool mutation."""
type UpdateToolPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Tool that was updated by this mutation."""
  tool: Tool

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our Tool. May be used by Relay 1."""
  toolEdge(
    """The method to use when ordering Tool."""
    orderBy: [ToolsOrderBy!] = [PRIMARY_KEY_ASC]
  ): ToolsEdge
}

"""All input for the updateTool mutation."""
input UpdateToolInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Tool to be updated.
  """
  nodeId: ID!

  """
  An object where the defined keys will be set on the Tool being updated.
  """
  toolPatch: ToolPatch!
}

"""Represents an update to a Tool. Fields that are set will be updated."""
input ToolPatch {
  id: Int
  name: String
  description: String
  command: String
}

"""All input for the updateToolById mutation."""
input UpdateToolByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  An object where the defined keys will be set on the Tool being updated.
  """
  toolPatch: ToolPatch!
  id: Int!
}

"""The output of our update Url mutation."""
type UpdateUrlPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Url that was updated by this mutation."""
  url: Url

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """Reads a single Vhost that is related to this Url."""
  vhostByVhostId: Vhost

  """An edge for our Url. May be used by Relay 1."""
  urlEdge(
    """The method to use when ordering Url."""
    orderBy: [UrlsOrderBy!] = [PRIMARY_KEY_ASC]
  ): UrlsEdge
}

"""All input for the updateUrl mutation."""
input UpdateUrlInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Url to be updated.
  """
  nodeId: ID!

  """
  An object where the defined keys will be set on the Url being updated.
  """
  urlPatch: UrlPatch!
}

"""Represents an update to a Url. Fields that are set will be updated."""
input UrlPatch {
  id: Int
  url: String
  vhostId: Int
  info: String
}

"""All input for the updateUrlById mutation."""
input UpdateUrlByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  An object where the defined keys will be set on the Url being updated.
  """
  urlPatch: UrlPatch!
  id: Int!
}

"""The output of our update VhostPort mutation."""
type UpdateVhostPortPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The VhostPort that was updated by this mutation."""
  vhostPort: VhostPort

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """Reads a single Vhost that is related to this VhostPort."""
  vhostByVhostId: Vhost

  """Reads a single Port that is related to this VhostPort."""
  portByPortId: Port

  """An edge for our VhostPort. May be used by Relay 1."""
  vhostPortEdge(
    """The method to use when ordering VhostPort."""
    orderBy: [VhostPortsOrderBy!] = [PRIMARY_KEY_ASC]
  ): VhostPortsEdge
}

"""All input for the updateVhostPort mutation."""
input UpdateVhostPortInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single VhostPort to be updated.
  """
  nodeId: ID!

  """
  An object where the defined keys will be set on the VhostPort being updated.
  """
  vhostPortPatch: VhostPortPatch!
}

"""
Represents an update to a VhostPort. Fields that are set will be updated.
"""
input VhostPortPatch {
  vhostId: Int
  portId: Int
}

"""All input for the updateVhostPortByVhostIdAndPortId mutation."""
input UpdateVhostPortByVhostIdAndPortIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  An object where the defined keys will be set on the VhostPort being updated.
  """
  vhostPortPatch: VhostPortPatch!
  vhostId: Int!
  portId: Int!
}

"""The output of our update Vhost mutation."""
type UpdateVhostPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Vhost that was updated by this mutation."""
  vhost: Vhost

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our Vhost. May be used by Relay 1."""
  vhostEdge(
    """The method to use when ordering Vhost."""
    orderBy: [VhostsOrderBy!] = [PRIMARY_KEY_ASC]
  ): VhostsEdge
}

"""All input for the updateVhost mutation."""
input UpdateVhostInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Vhost to be updated.
  """
  nodeId: ID!

  """
  An object where the defined keys will be set on the Vhost being updated.
  """
  vhostPatch: VhostPatch!
}

"""
Represents an update to a Vhost. Fields that are set will be updated.
"""
input VhostPatch {
  id: Int
  name: String
  info: String
}

"""All input for the updateVhostById mutation."""
input UpdateVhostByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  An object where the defined keys will be set on the Vhost being updated.
  """
  vhostPatch: VhostPatch!
  id: Int!
}

"""The output of our delete _PrismaMigration mutation."""
type DeletePrismaMigrationPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The _PrismaMigration that was deleted by this mutation."""
  _prismaMigration: _PrismaMigration
  deletedPrismaMigrationId: ID

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our _PrismaMigration. May be used by Relay 1."""
  _prismaMigrationEdge(
    """The method to use when ordering _PrismaMigration."""
    orderBy: [_PrismaMigrationsOrderBy!] = [PRIMARY_KEY_ASC]
  ): _PrismaMigrationsEdge
}

"""All input for the deletePrismaMigration mutation."""
input DeletePrismaMigrationInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single _PrismaMigration to be deleted.
  """
  nodeId: ID!
}

"""All input for the deletePrismaMigrationById mutation."""
input DeletePrismaMigrationByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: String!
}

"""The output of our delete Agent mutation."""
type DeleteAgentPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Agent that was deleted by this mutation."""
  agent: Agent
  deletedAgentId: ID

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our Agent. May be used by Relay 1."""
  agentEdge(
    """The method to use when ordering Agent."""
    orderBy: [AgentsOrderBy!] = [PRIMARY_KEY_ASC]
  ): AgentsEdge
}

"""All input for the deleteAgent mutation."""
input DeleteAgentInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Agent to be deleted.
  """
  nodeId: ID!
}

"""All input for the deleteAgentById mutation."""
input DeleteAgentByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!
}

"""The output of our delete Domain mutation."""
type DeleteDomainPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Domain that was deleted by this mutation."""
  domain: Domain
  deletedDomainId: ID

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our Domain. May be used by Relay 1."""
  domainEdge(
    """The method to use when ordering Domain."""
    orderBy: [DomainsOrderBy!] = [PRIMARY_KEY_ASC]
  ): DomainsEdge
}

"""All input for the deleteDomain mutation."""
input DeleteDomainInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Domain to be deleted.
  """
  nodeId: ID!
}

"""All input for the deleteDomainById mutation."""
input DeleteDomainByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!
}

"""The output of our delete DomainsHost mutation."""
type DeleteDomainsHostPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The DomainsHost that was deleted by this mutation."""
  domainsHost: DomainsHost
  deletedDomainsHostId: ID

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """Reads a single Domain that is related to this DomainsHost."""
  domainByDomainId: Domain

  """Reads a single Host that is related to this DomainsHost."""
  hostByHostId: Host

  """An edge for our DomainsHost. May be used by Relay 1."""
  domainsHostEdge(
    """The method to use when ordering DomainsHost."""
    orderBy: [DomainsHostsOrderBy!] = [PRIMARY_KEY_ASC]
  ): DomainsHostsEdge
}

"""All input for the deleteDomainsHost mutation."""
input DeleteDomainsHostInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single DomainsHost to be deleted.
  """
  nodeId: ID!
}

"""All input for the deleteDomainsHostByDomainIdAndHostId mutation."""
input DeleteDomainsHostByDomainIdAndHostIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  domainId: Int!
  hostId: Int!
}

"""The output of our delete Extractor mutation."""
type DeleteExtractorPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Extractor that was deleted by this mutation."""
  extractor: Extractor
  deletedExtractorId: ID

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our Extractor. May be used by Relay 1."""
  extractorEdge(
    """The method to use when ordering Extractor."""
    orderBy: [ExtractorsOrderBy!] = [PRIMARY_KEY_ASC]
  ): ExtractorsEdge
}

"""All input for the deleteExtractor mutation."""
input DeleteExtractorInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Extractor to be deleted.
  """
  nodeId: ID!
}

"""All input for the deleteExtractorById mutation."""
input DeleteExtractorByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!
}

"""The output of our delete Host mutation."""
type DeleteHostPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Host that was deleted by this mutation."""
  host: Host
  deletedHostId: ID

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """Reads a single Subnet that is related to this Host."""
  subnetBySubnetId: Subnet

  """An edge for our Host. May be used by Relay 1."""
  hostEdge(
    """The method to use when ordering Host."""
    orderBy: [HostsOrderBy!] = [PRIMARY_KEY_ASC]
  ): HostsEdge
}

"""All input for the deleteHost mutation."""
input DeleteHostInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Host to be deleted.
  """
  nodeId: ID!
}

"""All input for the deleteHostById mutation."""
input DeleteHostByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!
}

"""The output of our delete Keyword mutation."""
type DeleteKeywordPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Keyword that was deleted by this mutation."""
  keyword: Keyword
  deletedKeywordId: ID

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our Keyword. May be used by Relay 1."""
  keywordEdge(
    """The method to use when ordering Keyword."""
    orderBy: [KeywordsOrderBy!] = [PRIMARY_KEY_ASC]
  ): KeywordsEdge
}

"""All input for the deleteKeyword mutation."""
input DeleteKeywordInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Keyword to be deleted.
  """
  nodeId: ID!
}

"""All input for the deleteKeywordById mutation."""
input DeleteKeywordByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!
}

"""The output of our delete Param mutation."""
type DeleteParamPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Param that was deleted by this mutation."""
  param: Param
  deletedParamId: ID

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """Reads a single Vhost that is related to this Param."""
  vhostByVhostId: Vhost

  """An edge for our Param. May be used by Relay 1."""
  paramEdge(
    """The method to use when ordering Param."""
    orderBy: [ParamsOrderBy!] = [PRIMARY_KEY_ASC]
  ): ParamsEdge
}

"""All input for the deleteParam mutation."""
input DeleteParamInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Param to be deleted.
  """
  nodeId: ID!
}

"""All input for the deleteParamById mutation."""
input DeleteParamByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!
}

"""The output of our delete Port mutation."""
type DeletePortPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Port that was deleted by this mutation."""
  port: Port
  deletedPortId: ID

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """Reads a single Host that is related to this Port."""
  hostByHostId: Host

  """An edge for our Port. May be used by Relay 1."""
  portEdge(
    """The method to use when ordering Port."""
    orderBy: [PortsOrderBy!] = [PRIMARY_KEY_ASC]
  ): PortsEdge
}

"""All input for the deletePort mutation."""
input DeletePortInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Port to be deleted.
  """
  nodeId: ID!
}

"""All input for the deletePortById mutation."""
input DeletePortByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!
}

"""The output of our delete Request mutation."""
type DeleteRequestPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Request that was deleted by this mutation."""
  request: Request
  deletedRequestId: ID

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """Reads a single Url that is related to this Request."""
  urlByUrlId: Url

  """An edge for our Request. May be used by Relay 1."""
  requestEdge(
    """The method to use when ordering Request."""
    orderBy: [RequestsOrderBy!] = [PRIMARY_KEY_ASC]
  ): RequestsEdge
}

"""All input for the deleteRequest mutation."""
input DeleteRequestInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Request to be deleted.
  """
  nodeId: ID!
}

"""All input for the deleteRequestById mutation."""
input DeleteRequestByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!
}

"""The output of our delete Scan mutation."""
type DeleteScanPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Scan that was deleted by this mutation."""
  scan: Scan
  deletedScanId: ID

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """Reads a single Agent that is related to this Scan."""
  agentByAgentId: Agent

  """Reads a single Tool that is related to this Scan."""
  toolByToolId: Tool

  """An edge for our Scan. May be used by Relay 1."""
  scanEdge(
    """The method to use when ordering Scan."""
    orderBy: [ScansOrderBy!] = [PRIMARY_KEY_ASC]
  ): ScansEdge
}

"""All input for the deleteScan mutation."""
input DeleteScanInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Scan to be deleted.
  """
  nodeId: ID!
}

"""All input for the deleteScanById mutation."""
input DeleteScanByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!
}

"""The output of our delete Subnet mutation."""
type DeleteSubnetPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Subnet that was deleted by this mutation."""
  subnet: Subnet
  deletedSubnetId: ID

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our Subnet. May be used by Relay 1."""
  subnetEdge(
    """The method to use when ordering Subnet."""
    orderBy: [SubnetsOrderBy!] = [PRIMARY_KEY_ASC]
  ): SubnetsEdge
}

"""All input for the deleteSubnet mutation."""
input DeleteSubnetInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Subnet to be deleted.
  """
  nodeId: ID!
}

"""All input for the deleteSubnetById mutation."""
input DeleteSubnetByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!
}

"""The output of our delete Tool mutation."""
type DeleteToolPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Tool that was deleted by this mutation."""
  tool: Tool
  deletedToolId: ID

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our Tool. May be used by Relay 1."""
  toolEdge(
    """The method to use when ordering Tool."""
    orderBy: [ToolsOrderBy!] = [PRIMARY_KEY_ASC]
  ): ToolsEdge
}

"""All input for the deleteTool mutation."""
input DeleteToolInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Tool to be deleted.
  """
  nodeId: ID!
}

"""All input for the deleteToolById mutation."""
input DeleteToolByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!
}

"""The output of our delete Url mutation."""
type DeleteUrlPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Url that was deleted by this mutation."""
  url: Url
  deletedUrlId: ID

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """Reads a single Vhost that is related to this Url."""
  vhostByVhostId: Vhost

  """An edge for our Url. May be used by Relay 1."""
  urlEdge(
    """The method to use when ordering Url."""
    orderBy: [UrlsOrderBy!] = [PRIMARY_KEY_ASC]
  ): UrlsEdge
}

"""All input for the deleteUrl mutation."""
input DeleteUrlInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Url to be deleted.
  """
  nodeId: ID!
}

"""All input for the deleteUrlById mutation."""
input DeleteUrlByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!
}

"""The output of our delete VhostPort mutation."""
type DeleteVhostPortPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The VhostPort that was deleted by this mutation."""
  vhostPort: VhostPort
  deletedVhostPortId: ID

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """Reads a single Vhost that is related to this VhostPort."""
  vhostByVhostId: Vhost

  """Reads a single Port that is related to this VhostPort."""
  portByPortId: Port

  """An edge for our VhostPort. May be used by Relay 1."""
  vhostPortEdge(
    """The method to use when ordering VhostPort."""
    orderBy: [VhostPortsOrderBy!] = [PRIMARY_KEY_ASC]
  ): VhostPortsEdge
}

"""All input for the deleteVhostPort mutation."""
input DeleteVhostPortInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single VhostPort to be deleted.
  """
  nodeId: ID!
}

"""All input for the deleteVhostPortByVhostIdAndPortId mutation."""
input DeleteVhostPortByVhostIdAndPortIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  vhostId: Int!
  portId: Int!
}

"""The output of our delete Vhost mutation."""
type DeleteVhostPayload {
  """
  The exact same clientMutationId that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The Vhost that was deleted by this mutation."""
  vhost: Vhost
  deletedVhostId: ID

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our Vhost. May be used by Relay 1."""
  vhostEdge(
    """The method to use when ordering Vhost."""
    orderBy: [VhostsOrderBy!] = [PRIMARY_KEY_ASC]
  ): VhostsEdge
}

"""All input for the deleteVhost mutation."""
input DeleteVhostInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique ID which will identify a single Vhost to be deleted.
  """
  nodeId: ID!
}

"""All input for the deleteVhostById mutation."""
input DeleteVhostByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  id: Int!
}`
