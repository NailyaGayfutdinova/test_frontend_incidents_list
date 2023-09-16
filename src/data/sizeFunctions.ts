import {
  cardHeight,
  cardWidth,
  headerHeightMax,
  headerHeightMin,
  paginatorHeight,
  tableFirstRowHeight,
  tableRowHeightAv,
  tableRowHeightMin,
  windowWidthLarge,
  windowWidthMedium,
} from "./sizeConstants";

/*
 * Функция по расчету кол-ва карточек на странице
 * @params {{width: number, height: number}} windowSize - объект со значениями ширины и высоты доступного окна в пикселях
 * @return {number} quantity - кол-во карточек, которые будут отрисованы на странице
 */
export const calculateCardQuantity = (windowSize: {
  width: number;
  height: number;
}) => {
  const headerHeight =
    windowSize.width > windowWidthMedium ? headerHeightMin : headerHeightMax;
  const quantity =
    (Math.floor(windowSize.width / cardWidth) || 1) *
    (Math.floor(
      (windowSize.height - headerHeight - paginatorHeight) / cardHeight
    ) || 1);
  return quantity;
};

/*
 * Функция по расчету кол-ва строк в таблице на странице
 * @params {{width: number, height: number}} windowSize - объект со значениями ширины и высоты доступного окна в пикселях
 * @return {number} quantity - кол-во строк, которые будут отрисованы на странице
 */
export const calculateTableRows = (windowSize: {
  width: number;
  height: number;
}) => {
  const headerHeight =
    windowSize.width > windowWidthMedium ? headerHeightMin : headerHeightMax;
  const tableRowHeight =
    windowSize.width > windowWidthLarge ? tableRowHeightMin : tableRowHeightAv;
  const tableRows =
    Math.floor(
      (windowSize.height -
        headerHeight -
        tableFirstRowHeight -
        paginatorHeight) /
        tableRowHeight
    ) || 1;
  return tableRows;
};
