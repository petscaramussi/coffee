namespace Core.Exceptions
{
    public static class ThrowIf
    {
        public static class Throw<T>
        where T : Exception
        {
            public static void If(bool isInvalid, string message = null)
            {
                if (isInvalid)
                {
                    Exception e = Activator.CreateInstance(typeof(T), message) as Exception;
                    if (e != null) throw e;

                    throw Activator.CreateInstance<T>();
                }
            }
        }
    }
}
