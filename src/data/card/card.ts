export interface CardInterface {
  id: string;
  siteCardId: string;
  status: string;
  cardCreationDate: string;
  cardDueDate: string;
  preclassifierCode: string;
  preclassifierDescription: string;
  areaName: string;
  creatorName: string;
  cardTypeMethodologyName: string;
  priorityCode: string;
  priorityDescription: string;
  commentsAtCardCreation: string;
  mechanicName: string;
  userProvisionalSolutionName: string;
  cardProvisionalSolutionDate: string;
  commentsAtCardProvisionalSolution: string;
  userDefinitiveSolutionName: string;
  cardDefinitiveSolutionDate: string;
  commentsAtCardDefinitiveSolution: string;
  evidences: Evidences[];
}

interface Evidences {
  id: string;
  cardId: string;
  siteId: string;
  evidenceName: string;
  evidenceType: string;
  status: string;
  createdAt: string;
}

export interface CardDetailsInterface {
  card: CardInterface;
  evidences: Evidences[];
}
