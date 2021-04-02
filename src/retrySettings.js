class RetrySettings {

    /**
    * Creates a new instance of the SocketLabsClient
    * @param {number } defaultNumberOfRetries - Number of Retries.
    * @param {number} maximumAllowedNumberOfRetries - maximum mumber of Retries Allowed.
    * @param {string} minimumRetryTime  - The SocketLabs Injection API endpoint Url
    * @param {string} maximumRetryTime  - The http proxy you would like to use.
    */
    constructor({

        MaximumNumberOfRetries = null,
    } = {}) {

        MaximumNumberOfRetries = {

            get MaximumNumberOfRetries() {
                return this.MaximumNumberOfRetries;
            },
            set MaximumNumberOfRetries(value) {
                this.MaximumNumberOfRetries = value;
            }

        },

            RetrySettings(MaximumNumberOfRetries)
        {
            if (MaximumNumberOfRetries != null) {

                if (MaximumNumberOfRetries < 0)
                    throw new ArgumentOutOfRangeException(nameof(maximumNumberOfRetries));

                if (maximumNumberOfRetries > 5)
                    throw new ArgumentOutOfRangeException(nameof(maximumNumberOfRetries)),

                    MaximumNumberOfRetries = maximumNumberOfRetries.Value;
            }
            else
                MaximumNumberOfRetries = _defaultNumberOfRetries;

        }

        GetNextWaitInterval(numberOfAttempts)
        {
            var interval = Math.Min(
                minimumRetryTime.TotalMilliseconds + GetRetryDelta(numberOfAttempts),
                maximumRetryTime.TotalMilliseconds);

            return TimeSpan.FromMilliseconds(interval);
        }

        GetRetryDelta(numberOfAttempts)
        {


            min = (int)(TimeSpan.FromSeconds(1).TotalMilliseconds * 0.8);
            max = (int)(TimeSpan.FromSeconds(1).TotalMilliseconds * 1.2);

            return (int)((Math.Pow(2.0, numberOfAttempts) - 1.0) * random.Next(min, max));
        }
    }
}
