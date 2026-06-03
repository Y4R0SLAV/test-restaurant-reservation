- [ ] Понять текущую логику раскладки карточек (top/height) и где добавить вычисление колонок/сдвигов.
- [ ] Согласовать план правок: вычисление конфликтов по времени, правило ±30 минут -> колонка; наложение -> отступ 4px.
- [ ] Внести изменения в `src/utils/timeline.ts` (добавить layout-поля: colIndex, offsetPx или leftPx) и/или `TimelineEventLayout`.
- [ ] Обновить компоненты блоков (`TimelineReservationBlock.vue`, `TimelineOrderBlock.vue`) чтобы применить `left`/`transform` и ширину под колонку.
- [ ] Обновить `TableTimelineTrack.vue` чтобы передавать новые layout-поля в блоки.
- [x] Исправить TS6133 в `TimelineReservationGuest.vue`.
- [ ] Прогнать `npm run build`.

