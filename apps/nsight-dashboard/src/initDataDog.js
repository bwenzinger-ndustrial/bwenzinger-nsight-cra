import { datadogLogs } from '@datadog/browser-logs';
import { datadogRum } from '@datadog/browser-rum';

export const initDataDog = () => {
  const ddConf = window.nd.dd;

  // Initialize datadog logs
  datadogLogs.init({
    clientToken: ddConf.log.clientToken,
    service: ddConf.service,
    site: 'datadoghq.com',
    forwardErrorsToLogs: true,
    sampleRate: 100,
    env: window.nd.env
  });

  // Initialize datadog Real User Monitoring (RUM)
  datadogRum.init({
    applicationId: ddConf.rum.applicationId,
    clientToken: ddConf.rum.clientToken,
    site: 'datadoghq.com',
    service: ddConf.service,
    env: window.nd.env,
    // Specify a version number to identify the deployed version of your application in Datadog
    // version: '1.0.0',
    sampleRate: 100,
    trackInteractions: true
  });
};
